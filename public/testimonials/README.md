# Testimonial assets

Drop videos and screenshots into this folder, then update the
`testimonials` array in `app/thank-you/page.tsx` to point at them.

Recommended file names:

```
public/testimonials/01.mp4     # video, 16:9 (matches aspect: "video")
public/testimonials/01.jpg     # optional poster for 01.mp4
public/testimonials/02.jpg     # portrait screenshot (3:4)
public/testimonials/03.jpg     # portrait screenshot (3:4)
public/testimonials/04.mp4     # video, 16:9
public/testimonials/04.jpg     # optional poster for 04.mp4
public/testimonials/05.jpg     # square screenshot (1:1)
public/testimonials/06.jpg     # square screenshot (1:1)
public/testimonials/07.jpg     # square screenshot (1:1)
```

Then in `app/thank-you/page.tsx` swap each tile's `src` from `""`
to e.g. `"/testimonials/01.mp4"`.

Recommendations:
- Videos: H.264 mp4, 1080p or 720p, under 30MB each. Compress with
  `ffmpeg -i in.mov -vcodec libx264 -crf 23 -preset slow -movflags +faststart out.mp4`
- Posters: same aspect as the video, jpg, ~150KB.
- Screenshots: crop to the tile's aspect (3:4 portrait or 1:1 square)
  before uploading. PNG for sharp text, JPG for photos.
