# Assets Directory

This directory contains all the static assets for the project:

## Structure

```
assets/
├── videos/
│   ├── instagram-reels/    # Vertical format (9:16)
│   │   └── video1.mp4     # Example naming
│   ├── youtube-shorts/     # Vertical format (9:16)
│   │   └── video1.mp4
│   └── youtube-videos/     # Horizontal format (16:9)
│       └── video1.mp4
├── images/
    ├── posters/           # Square format (1:1)
    │   └── poster1/
    │       ├── slide1.jpg
    │       └── slide2.jpg
    ├── logos/            # Square format (1:1)
    │   └── logo1/
    │       ├── slide1.png
    │       └── slide2.png
    ├── business-cards/   # Square format (1:1)
    │   └── card1/
    │       ├── slide1.png
    │       └── slide2.png
    ├── brochures/       # Square format (1:1)
    │   └── brochure1/
    │       ├── slide1.jpg
    │       └── slide2.jpg
    ├── websites/        # 4:3 format
    │   └── site1/
    │       ├── slide1.jpg
    │       └── slide2.jpg
    └── thumbnails/      # Square format (1:1)
        └── thumb1/
            ├── slide1.jpg
            └── slide2.jpg
```

## Guidelines

- Video formats:
  - Instagram Reels & YouTube Shorts: 9:16 aspect ratio
  - YouTube Videos: 16:9 aspect ratio
  - All videos should be in MP4 format

- Image formats:
  - Posters, Logos, Business Cards, Brochures, Thumbnails: 1:1 aspect ratio
  - Websites: 4:3 aspect ratio
  - Use JPG for photos, PNG for logos and graphics

## Usage

Import assets in your components like this:
```tsx
// For development placeholder
import placeholderImage from '../assets/images/logos/placeholder.jpg'
```

Replace placeholder content with your actual media files following the same naming convention:
- video1.mp4, video2.mp4, etc.
- slide1.jpg, slide2.jpg, etc.