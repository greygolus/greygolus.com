// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const projectData: Record<string, any> = {
  "quantum": {
    title: "Quantum Optomechanics",
    description: "Research on levitated nanoparticles cooled toward their motional ground state.",
    content: "A 100nm silica particle is levitated by a 1064nm laser within a high vacuum environment. The goal is to cool the motional state toward its ground level. We use two Electro Optic Modulators to control beam polarization and coupled vibrational modes. A separate 532nm probe beam passes through a photodiode bridge to record motion signals. I then convert voltage data into phonon counts to observe Rabi oscillations. This system serves as a macroscopic analog for a quantum bit.",
    link: "/projects/quantum-poster.pdf",
    linkText: "View Poster",
    gallery: [
      { src: "/projects/quantum/quantum-1.jpg", caption: "A side view of the high vacuum chamber where the silica particle is levitated." },
      { src: "/projects/quantum/quantum-2.jpg", caption: "Top down view of the experimental setup showing the laser entry and detection ports." },
      { src: "/projects/quantum/quantum-3.jpg", caption: "The custom alignment system used to stabilize the laser trapping beam." },
      { src: "/projects/quantum/quantum-4.jpg", caption: "An image of the actual 100nm silica particle held in the optical trap. Credit: Yifan Bu, UR Optics Department." }
    ],
    year: "2024",
    role: "Student Researcher",
    tech: ["MATLAB", "Quantum Physics", "Laser Diagnostics"],
    accent: "from-purple-500 to-indigo-900"
  },
  "thin-lens": {
    title: "Thin Lens Guide",
    description: "A mathematical visualization tool for paraxial ray tracing and imaging equations.",
    content: "This tool provides a mathematical visualization for paraxial ray tracing and standard imaging equations. It was developed to help students understand how principal planes and focal points behave in multi element systems. Users can manipulate an object slider to see the differences between Gaussian and Newtonian representations. This helps build an intuition for light behavior before transitioning to complex simulation software.",
    link: "https://thin.greygolus.com",
    image: "/projects/thinlens.png",
    year: "2025-2026",
    role: "Developer / Designer",
    tech: ["React", "SVG", "Educational Tech"],
    accent: "from-emerald-500 to-teal-900"
  },
  "interferometer": {
    title: "Interferometry",
    description: "Analysis of interference patterns to measure the wavelength of laboratory lasers.",
    content: "This project involves a deep analysis of interference patterns to determine laboratory laser wavelengths. I developed a system to automate fringe counting using a CCD camera and custom software. This approach reduced measurement error for our Helium Neon source significantly. The work required precise alignment of mirror systems to produce stable circular fringes while monitoring phase shifts caused by air pressure changes.",
    link: "https://sim.greygolus.com",
    image: "/projects/interferometer.png",
    year: "2025-2026",
    role: "Developer",
    tech: ["MATLAB", "Physics Modeling", "Web Simulation"],
    accent: "from-cyan-500 to-blue-900"
  },
  "blackbody-led": {
    title: "Blackbody LED",
    description: "Computational model of a white light LED source following Planckian locus.",
    content: "This is a computational model for white light LED sources designed to follow the Planckian locus. I created an algorithm to determine the intensities for multi color LED chips needed to simulate blackbody radiation at specific color temperatures. The simulation calculates chromaticity coordinates and optimizes the spectral mixture. This ensures the output maintains a high Color Rendering Index while staying close to the ideal curve.",
    year: "2025-2026",
    role: "Optical Engineer",
    tech: ["MATLAB", "Color Theory", "Radiometry"],
    accent: "from-orange-500 to-red-900"
  },
  "stage-lighting": {
    title: "Stage Lighting",
    description: "Theatrical lighting design focusing on color theory for Sunecho 3.",
    content: "This work applies theatrical lighting design principles to explore color theory. The scene was designed to recreate the specific atmosphere of Sunecho 3 by LJ Altvater. I utilized theater fixtures to balance a green UV glow on geometric set pieces with a purple environment wash. This required precise exercise in color mixing and beam control. These optical principles apply to an audience just as they would to a scientific detector.",
    images: ["/projects/stage-lighting-still.JPG", "/projects/stage-lighting-ref.JPG"],
    year: "2024",
    role: "Lighting Designer",
    tech: ["Vectorworks", "ETC EOS", "Color Theory"],
    accent: "from-pink-500 to-rose-900"
  }
};
