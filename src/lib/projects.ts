export const projectData: Record<string, any> = {
  "quantum": {
    title: "Quantum Optomechanics",
    description: "Research on levitated nanoparticles cooled toward their motional ground state.",
    content: "A 100nm silica particle levitated by a 1064nm laser in a high-vacuum chamber and cooled toward its motional ground state. We modulated beam polarization through two EOMs to control coupling between the X and Y vibrational modes, then used a 532nm probe beam and a photodiode bridge to measure the motion signal. After converting voltage data to mean phonon number we could clearly see the Rabi oscillation — energy cycling between modes at roughly 10kHz. The system acts as a semiclassical analog to a qubit.",
    link: "/projects/quantum-poster.pdf",
    linkText: "View Poster",
    gallery: [
      { src: "/projects/quantum/quantum-1.jpg", caption: "A side view of the high-vacuum chamber where the silica particle is levitated." },
      { src: "/projects/quantum/quantum-2.jpg", caption: "Top-down view of the experimental setup showing the laser entry and detection ports." },
      { src: "/projects/quantum/quantum-3.jpg", caption: "The custom alignment system used to stabilize the laser trapping beam." },
      { src: "/projects/quantum/quantum-4.jpg", caption: "An image of the actual 100nm silica particle held in the optical trap." },
      { src: "/projects/quantum/quantum-5.jpg", caption: "Detailed schematic diagram of the optical path and detection bridge." }
    ],
    year: "2024",
    role: "Student Researcher",
    tech: ["MATLAB", "Quantum Physics", "Laser Diagnostics"],
    accent: "from-purple-500 to-indigo-900"
  },
  "thin-lens": {
    title: "Thin Lens Guide",
    description: "A mathematical visualization tool for paraxial ray tracing and imaging equations.",
    content: "Built during my second year to help students visualize how principal planes and focal points shift in complex multi-element systems. It uses paraxial approximations to calculate magnification and image positions in real-time. By moving the object slider, users can see the 'Gausian' versus 'Newtonian' representations of the system, helping build an intuitive feel for how light behaves before jumping into heavy Zemax simulations.",
    link: "https://thin.greygolus.com",
    image: "/projects/thinlens.png",
    year: "2025-2026",
    role: "Developer / Designer",
    tech: ["React", "SVG", "Educational Tech"],
    accent: "from-emerald-500 to-teal-900"
  },
  "interferometer": {
    title: "Michelson Interferometer",
    description: "Analysis of interference patterns to measure the wavelength of laboratory lasers.",
    content: "A deep dive into the classic Michelson-Morley setup. I automated the fringe counting process using a CCD camera and a custom Python script, reducing measurement error for our HeNe laser wavelength down to ±0.2nm. The project involved fine-tuning mirror alignment to achieve 'circular' fringes and analyzing how air pressure fluctuations in the lab created detectable phase shifts. It’s a perfect example of how sensitive optical measurements can be.",
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
    content: "An exploration into the spectral power distribution of light sources. I developed a model to find the necessary intensities of multi-color LED chips to simulate a blackbody source at various correlated color temperatures (CCT). The simulation calculates the chromaticity coordinates and optimizes the mixture to stay as close to the Planckian locus as possible while maintaining a high Color Rendering Index (CRI). Truly 'white' light is harder to make than it looks.",
    year: "2025-2026",
    role: "Optical Engineer",
    tech: ["MATLAB", "Color Theory", "Radiometry"],
    accent: "from-orange-500 to-red-900"
  },
  "stage-lighting": {
    title: "Stage Lighting",
    description: "Theatrical lighting design focusing on color theory for 'Sunecho 3'.",
    content: "I did backstage work throughout high school and later took a stage lighting course at Rochester. This photo is from that class — I designed a lighting scene to recreate the feeling of Sunecho 3 by LJ Altvater using the fixtures available in the theater. Getting the green UV glow on the geometric set pieces, the purple atmosphere wash, and the warm center panel to work together was a real exercise in color mixing and beam control. The same principles that make optical systems work just applied to an audience instead of a detector.",
    images: ["/projects/stage-lighting-ref.JPG", "/projects/stage-lighting-still.JPG"],
    year: "2024",
    role: "Lighting Designer",
    tech: ["Vectorworks", "ETC EOS", "Color Theory"],
    accent: "from-pink-500 to-rose-900"
  }
};
