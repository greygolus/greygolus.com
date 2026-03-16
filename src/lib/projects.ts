export const projectData: Record<string, any> = {
  "quantum": {
    title: "Quantum Optomechanics",
    description: "Research on levitated nanoparticles cooled toward their motional ground state.",
    content: "A 100nm silica particle levitated by a 1064nm laser in a high-vacuum chamber and cooled toward its motional ground state. We modulated beam polarization through two EOMs to control coupling between the X and Y vibrational modes, then used a 532nm probe beam and a photodiode bridge to measure the motion signal. After converting voltage data to mean phonon number we could clearly see the Rabi oscillation — energy cycling between modes at roughly 10kHz. The system acts as a semiclassical analog to a qubit.",
    link: "https://greygolus.com/LevitatedQuantumOptomechanicsPosterFinal.pdf",
    linkText: "View Poster",
    image: "/projects/quantum.png",
    year: "2024",
    role: "Student Researcher",
    tech: ["MATLAB", "Data Analysis", "Quantum Physics"],
    accent: "from-purple-500 to-indigo-900"
  },
  "thin-lens": {
    title: "Thin Lens Guide",
    description: "A guide to thin lenses that includes a tool for visualizing object and image locations.",
    content: "A guide to thin lenses that includes a tool for seeing how object location affects image location with either a single positive or negative thin lens.",
    link: "https://thin.greygolus.com",
    image: "/projects/thinlens.png",
    year: "2024",
    role: "Developer / Designer",
    tech: ["React", "SVG", "Educational Tech"],
    accent: "from-emerald-500 to-teal-900"
  },
  "interferometer": {
    title: "Interferometer Simulation",
    description: "A browser-based simulation of an Interferometer built to visualize wave interference in real time.",
    content: "A browser-based simulation of an Interferometer I built to visualize wave interference in real time. Adjust mirror displacement and wavelength to watch the fringe pattern shift and collapse. Built using MATLAB-based algorithms and visualized with high-precision rendering — the optics are computed from first principles.",
    link: "https://sim.greygolus.com",
    image: "/projects/interferometer.png",
    year: "2024",
    role: "Developer",
    tech: ["MATLAB", "Physics Modeling", "Web Simulation"],
    accent: "from-cyan-500 to-blue-900"
  },
  "blackbody-led": {
    title: "Blackbody vs LED",
    description: "An interactive visualization exploring the spectral gaps between real blackbody radiation and LED.",
    content: "An interactive visualization I built to explore why most LED bulbs feel 'off' compared to incandescent light. It uses Planck's law to generate real blackbody radiation curves at any color temperature and overlays a typical phosphor-converted LED spectrum for comparison. The spectral gaps — especially in the deep red — are immediately obvious and explain why high-CRI bulbs matter. Drag the slider to see how the ideal blackbody curve shifts with temperature.",
    image: "/projects/blackbody.png",
    year: "2024",
    role: "Color Scientist",
    tech: ["Chart.js", "Spectrometry", "Color Science"],
    accent: "from-orange-500 to-red-900"
  },
  "stage-lighting": {
    title: "Stage Lighting",
    description: "Theatrical lighting design focusing on color theory for 'Sunecho 3'.",
    content: "I did backstage work throughout high school and later took a stage lighting course at Rochester. This photo is from that class — I designed a lighting scene to recreate the feeling of Sunecho 3 by LJ Altvater using the fixtures available in the theater. Getting the green UV glow on the geometric set pieces, the purple atmosphere wash, and the warm center panel to work together was a real exercise in color mixing and beam control. The same principles that make optical systems work just applied to an audience instead of a detector.",
    image: "/projects/stagelighting.png",
    year: "2024",
    role: "Lighting Designer",
    tech: ["Vectorworks", "ETC EOS", "Color Theory"],
    accent: "from-pink-500 to-rose-900"
  }
};
