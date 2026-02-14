# San Diego Dog Beach Info 🐕 🏖️

A real-time web dashboard showing current conditions at San Diego's dog-friendly beaches. Perfect for planning your next beach outing with your pup!

**Live Site**: https://samiprehn.github.io/sd_dog_beaches/

## Features

- **⏰ Timing**: Sunrise/sunset times and today's tide schedule
- **🌤️ Conditions**: Current temperate, high temperature, weather conditions, wind, and humidity for each beach
- **🌡️ Ocean Temperature**: Real-time water temperatures from NOAA buoys at 4 locations
- **📹 Webcams**: Direct links to live beach cameras

## Beaches Covered

- Ocean Beach Dog Beach
- Del Mar Dog Beach  
- Coronado Dog Beach

## Data Sources

- **Weather Data**: [Open-Meteo API](https://open-meteo.com/)
- **Tide Data**: NOAA Tides & Currents (Station 9410230 - La Jolla/Scripps Pier)
- **Water Temperature**: NOAA buoys (46266, LJAC1, SDBC1, 46235)
- **Sunrise/Sunset**: [Sunrise-Sunset.org API](https://sunrise-sunset.org/api)

## Mobile Optimized

The interface is designed with mobile users in mind, featuring:
- Compact, dense layout to minimize scrolling
- Responsive grid design
- Touch-friendly buttons
- Reduced padding and spacing for phone screens

## API Notes

Water temperature data uses a CORS proxy (`corsproxy.io`) to access NOAA buoy data from the browser. Station IDs must be uppercase (e.g., `LJAC1`, not `ljac1`).

## License

MIT License - feel free to use and modify for your own projects!

## Contributing

Found a bug or have a feature request? Open an issue or submit a pull request!

---

Made with ❤️ for San Diego dog owners
