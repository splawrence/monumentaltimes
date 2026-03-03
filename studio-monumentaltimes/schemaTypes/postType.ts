import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'author',
      type: 'string',
      title: 'Author',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      validation: (rule) => rule.required(),
      options: {
        list: [
          {title: 'Spiritual/Bible', value: 'Spiritual/Bible'},
          {title: 'Opinion/Testimony', value: 'Opinion/Testimony'},
          {title: 'News Flash', value: 'News Flash'},
          {title: 'Biography/History', value: 'Biography/History'},
          {title: 'Recipes', value: 'Recipes'},
          {title: 'Poetry & Art', value: 'Poetry & Art'},
          {title: 'Stories & Comics', value: 'Stories & Comics'},
          {title: 'Tech & Sports', value: 'Tech & Sports'},
          {title: 'Reviews', value: 'Reviews'},
          {title: 'Issues', value: 'Issues'},
        ],
      },
    }),
    defineField({
      name: 'canvaEmbed',
      type: 'url',
      title: 'Canva Embed URL',
      description: 'Paste the Canva embed URL (e.g., https://www.canva.com/design/...view?embed)',
    }),
  ],
})
