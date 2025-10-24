# Teuvo Järvenpää Oy — React SPA

This is a Vite + React single-page app version of the site. Visual design is preserved 1:1 with the static HTML/CSS.

## Scripts
- npm install
- npm run dev
- npm run build
- npm run preview

## Assets
Copy the existing `assets/` folder from the project root into `react-app/public/assets/` so images load correctly in the SPA.

On Windows PowerShell:

Copy-Item -Recurse -Force "..\assets" "public\assets"

## Routes
- /
- /services
- /services/julkisivutyot
- /services/maalaustyot
- /services/rappaustyot
- /services/parvekekorjaukset
- /services/tasoitetyot
- /services/huoneistoremontit

## Notes
- Anchor links like /#gallery and /#contact are supported; the app will scroll to the matching section on navigation.
- Floating contact panel is implemented as a reusable component with identical styles and behavior (mobile collapse, label "Jaa").
