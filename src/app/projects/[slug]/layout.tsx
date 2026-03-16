import { Metadata } from 'next';

import { projectData } from '@/lib/projects';

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
