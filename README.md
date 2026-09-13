# Bharat-sathi-mvp
It is an AI travel companion designed with a specific mission: for every place a tourist asks about, the platform quietly moves a slice of that demand toward a verified, lesser-known alternative nearby. It aims to achieve this while keeping the traveler safe, informed, and connected directly to local economies.

⚠️ The Problem Statement

The Indian tourism landscape faces three deeply connected problems:
Extreme Concentration: A handful of destinations absorb a disproportionate share of visitors, degrading the experience and stressing fragile monuments. Meanwhile, thousands of ASI-protected monuments, craft villages, and homestays remain invisible simply because nothing actively points a traveler toward them.
Lack of Structured Safety Data: Crucial information that keeps travelers safe—such as which streets to avoid after dark or identifying unofficial guides—exists only as scattered comments on forums. Every new visitor relearns this the hard way.
Invisible Local Economies: Local operators lack digital storefronts because no discovery layer routes tourists to them. Popularity-ranked algorithms only reinforce the same handful of famous names, keeping genuine local alternatives hidden.
✨ Key Features
De-congestion "Twin Finder": The headline feature. It uses vector embeddings to surface verified, lower-footfall alternatives (twins) for highly popular tourist spots.
RAG-Grounded Chatbot: A conversational itinerary planner that never free-generates facts. It uses Retrieval-Augmented Generation (RAG) to ensure the AI only suggests real places and avoids hallucinating non-existent hidden gems.
Safety Snapshot: A transparent, curated composite of local safety signals (e.g., nearest help points, notes for solo women travelers) rather than an unverified "black-box" ML score.
Know-Before-You-Go Tips: Pattern-level local knowledge regarding unspoken rules, etiquette, and scam warnings.
Local Mode: A 4-question intake form allowing locals to submit hidden gems, safety tips, and local contacts, growing the platform's dataset organically.
Direct-Contact Link-Outs: Connects tourists directly to local homestays, guides, and artisans via WhatsApp, putting money directly into local hands without complex payment gateways.
Multilingual Voice & Text: Full Hindi (HI) and English (EN) support, powered by Indian-language-first AI models that handle code-mixed queries (Hinglish) natively.
🛠 Technology Stack
The stack is chosen for maximum speed, reliability, and capability within a 35-hour hackathon environment:
Frontend: Next.js (React + TypeScript), Tailwind CSS, shadcn/ui.
Backend: Next.js API Routes (serverless functions).
Database & Auth: Supabase (Postgres, PostGIS, pgvector for embeddings, Auth via Google OAuth, and Storage for photos).
Mapping: Leaflet.js + OpenStreetMap tiles + Nominatim (geocoding).
AI & LLM: Sarvam API (sarvam-105b-conversations) for chat replies and reasoning.
Embeddings: OpenAI (text-embedding-3-small) shared by both RAG and the Twin Finder.
Voice Input/Output: Bhashini ULCA APIs + Sarvam Speech (Saaras STT + Bulbul TTS).
Deployment: Vercel.
🔮 Future Scope
Once the initial pilot is proven, the roadmap includes:
Deeper Language Integration: Real-time speech-to-speech translation across all 22 scheduled Indian languages using Bhashini and Sarvam.
ONDC Integration: Direct ticket booking and payment settlement once merchant relationships are established.
Government Analytics Portal: A dashboard for tourism boards to track footfall redistribution and sentiment.
Robust Trust Mechanisms: Implementing phone OTP (post-DLT registration), a full moderation pipeline with SafeSearch, and blockchain-anchored reviews.
Native Mobile Application: Building a Flutter app or PWA wrapper for deeper device integration and push notifications.
Live Crowd Density: Integrating genuine privacy-respecting crowd-density signals once a legitimate data partnership exists.
