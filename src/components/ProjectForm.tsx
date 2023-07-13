'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ProjectInterface, SessionInterface } from '@/common';
import { createNewProject, fetchToken, updateProject } from '@/lib/actions';

import Button from './Button';
import CustomMenu from './CustomMenu';
import FormField from './FormField';

import { categoryFilters } from '@/constants';

interface ProjectFormProps {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
}

const ProjectForm = (props: ProjectFormProps) => {
  const { type, session, project } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: project?.title || '',
    description: project?.description || '',
    image: project?.image || '',
    liveSiteUrl: project?.liveSiteUrl || '',
    githubUrl: project?.githubUrl || '',
    category: project?.category || '',
  });

  const router = useRouter();

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes('image')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      setForm((prev) => ({ ...prev, image: result }));
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === 'create') {
        await createNewProject(form, session?.user?.id, token);

        router.push('/');
      } else if (type === 'edit' && project) {
        await updateProject(form, project.id, token);

        router.push('/');
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label rounded">
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          required={type === 'create'}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form.image}
            className="sm:p-10 object-contain z-20"
            alt="Project poster"
            fill
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange('title', value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        setState={(value) => handleStateChange('description', value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://google.com"
        setState={(value) => handleStateChange('liveSiteUrl', value)}
      />
      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/ezeamin"
        setState={(value) => handleStateChange('githubUrl', value)}
      />
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === 'create' ? 'Creating' : 'Editing'}`
              : `${type === 'create' ? 'Create' : 'Edit'}`
          }
          type="submit"
          bgColor="bg-green-500"
          leftIcon={
            isSubmitting
              ? ''
              : `${type === 'create' ? '/plus.svg' : '/pencile.svg'}`
          }
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};
export default ProjectForm;
