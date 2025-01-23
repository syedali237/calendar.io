import { GoogleGenerativeAI } from "@google/generative-ai";
import { Event } from "./interfaces/event.interface";

interface TravelEstimation {
  origin: string;
  destination: string;
  travelTime: number;  
  distance: number;   
  transportMode: 'driving' | 'walking' | 'transit' | 'unknown';
}

class TravelTimeService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key is not configured");
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  // Haversine formula for calculating distance between coordinates
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Get current location using browser's Geolocation API
  private getCurrentLocation(): Promise<{latitude: number, longitude: number}> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // Use Google Maps Geocoding to convert location to coordinates
  private async getLocationCoordinates(location: string): Promise<{latitude: number, longitude: number} | null> {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`
      );
      const data = await response.json();
      
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  }

  async estimateTravelTime(event: Event): Promise<TravelEstimation | null> {
    // Check if location exists
    if (!event.location) {
      console.error('No location provided for travel time estimation');
      return null;
    }

    try {
      // Get current location
      const currentLocation = await this.getCurrentLocation();
      
      // Get event location coordinates
      const eventLocation = await this.getLocationCoordinates(event.location);
      
      if (!eventLocation) {
        console.error('Could not find coordinates for event location');
        return null;
      }

      // Calculate distance
      const distance = this.calculateDistance(
        currentLocation.latitude, 
        currentLocation.longitude, 
        eventLocation.latitude, 
        eventLocation.longitude
      );

      // Use Gemini for travel time and mode estimation
      const model = this.genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash"
      });

      const prompt = `
        Estimate travel time and mode based on these details:
        - Distance: ${distance.toFixed(2)} kilometers
        - Origin Location Coordinates: (${currentLocation.latitude}, ${currentLocation.longitude})
        - Destination Location: ${event.location}

        Return a JSON object with:
        - travelTime: Estimated travel time in minutes
        - transportMode: Most likely mode of transport (driving/walking/transit/unknown)
      `;

      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("No valid JSON found in response");
        return null;
      }

      const estimation = JSON.parse(jsonMatch[0]);
      
      return {
        origin: `${currentLocation.latitude}, ${currentLocation.longitude}`,
        destination: event.location,
        travelTime: estimation.travelTime || 0,
        distance: distance,
        transportMode: estimation.transportMode || 'unknown'
      };
    } catch (error) {
      console.error('Travel time estimation failed', error);
      return null;
    }
  }
}

export default new TravelTimeService();