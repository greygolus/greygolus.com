import { Metadata } from 'next';

const projectData: Record<string, any> = {
  "quantum": {
    title: "Quantum Optomechanics",
    description: "Research on levitated nanoparticles cooled toward their motional ground state.",
    image: "/projects/quantum.png",
  },
  "thin-lens": {
    title: "Thin Lens Guide",
    description: "A guide to thin lenses that includes a tool for visualizing object and image locations.",
    image: "/projects/thinlens.png",
  },
  "interferometer": {
    title: "Interferometer Simulation",
    description: "A browser-based simulation of an Interferometer built to visualize wave interference in real time.",
    image: "/projects/interferometer.png",
  },
  "blackbody-led": {
    title: "Blackbody vs LED",
    description: "An interactive visualization exploring the spectral gaps between real blackbody radiation and LED.",
    image: "/projects/blackbody.png",
  },
  "stage-lighting": {
    title: "Stage Lighting",
    description: "Theatrical lighting design focusing on color theory for 'Sunecho 3'.",
    image: "/projects/stagelighting.png",
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectData[slug];
  if (!project) return { title: 'Project Not Found | Grey Golus' };
  
  return {
    title: `${project.title} | Grey Golus`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Grey Golus`,
      description: project.description,
      images: [project.image || '/projects/interferometer.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Grey Golus`,
      description: project.description,
      images: [project.image || '/projects/interferometer.png'],
    }
  };
}

export default async function ProjectLayout({ 
  children,
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  // Awaiting params here as well if needed, though children are just rendered
  await params;
  return <>{children}</>;
}
