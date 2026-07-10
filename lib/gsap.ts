"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registro único de plugins GSAP para toda la app.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
