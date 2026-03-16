import React from 'react';
import { projectData } from '@/lib/projects';
import ProjectPageClient from '@/components/ProjectPageClient';

export async function generateStaticParams() {
  return Object.keys(projectData).map((slug) => ({
    slug: slug,
  }));
}

export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const project = projectData[slug];

  // Determine the next project in the loop
  const projectKeys = Object.keys(projectData);
  let nextProject = null;
  if (slug) {
    const currentIndex = projectKeys.indexOf(slug);
    const nextIndex = (currentIndex + 1) % projectKeys.length;
    const nextProjectSlug = projectKeys[nextIndex];
    nextProject = {
      slug: nextProjectSlug,
      title: projectData[nextProjectSlug].title
    };
  }

  return (
    <ProjectPageClient 
      project={project} 
      slug={slug} 
      nextProject={nextProject} 
    />
  );
}
