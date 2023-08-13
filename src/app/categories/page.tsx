// AllCategoriesPage.js
'use client';

import React from 'react';
import { client } from '@/utils/client';
import { ICategory } from '@/Components/model';
import HeroBanner from '@/Components/HeroBanner';
import SectionHeading from '@/Components/SectionHeading';
import AllCategories from '@/Featured/Categories';

const getAllCategoriesQueries = `
  *[_type == "category"] {
    "id": _id,
    name,
    "slug": slug.current,
    "image": image.asset->url 
  }
`;

const getCategoriesAsync = async () => {
  try {
    const categories: ICategory[] = await client.fetch(getAllCategoriesQueries);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

const AllCategoriesPage = () => {
  const [categories, setCategories] = React.useState<ICategory[]>([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategoriesAsync();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <HeroBanner />
      <div className='max-w-7xl mx-auto'>
        <SectionHeading title="All Categories" />
        <AllCategories categories={categories} />
      </div>
    </>
  );
};

export default AllCategoriesPage;
