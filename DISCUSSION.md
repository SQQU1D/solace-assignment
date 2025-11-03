# Database / schema

### Specialties 
In our advocates table, we have a collection of specialties, represented by an array of strings.
Ideally, we would have a separate model for a specialty, for example...
```javascript
const specialty = pgTable("specialty", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  });
  ```

We can update the advocate table to then have a many-to-many relationship between advocates and specialties.
This opens the door for more efficient queries and allows us to filter by specialty.
It also enables us to easily manage the specialties in the future; a small internal CMS/CRUD tool could be used to manage the specialties, possibly leveraging tools like Retool to expedite the development process.

Additionally, the degree could be an enum, as there is a limited set of options. This would make it easy to filter (perhaps by a multiselect/dropdown on the clientside)


# Server components
 - For getting advocates: We could build a data-fetching function which runs on the server, and update the page to be an async server component. We would pass the data to the client component (list of advocates) as props. With the final payload getting sent to the client, there would no longer be a need for a client-side fetch and no extra API route needed, and the bonus of getting automatic caching provided for us.
 - Expand on the server-first mindset. We could update all our components that don't have the `"use client"` directive to be async functions.
 - Add paging to our query and results list.
 - Once our searches get more complex, we'd want to make sure we implement parallel data fetching (easily accomplished with `Promise.all()`)

# Client Side
- Cleaning up the styling and making it consistent throughout all the pages and components, implement Tailwinds. Get the real designer palette instead of this NBA Seattle Supersonics (RIP) lookalike.
- Implementing an actual modal or meaningful UI for the specialties like an icon list.
- Additional sorting and filtering options, multi selects and dropdowns for data like degree and specialty.
- Flesh out the loading state, ideally using a `loading.tsx` special file convention so we can take advantage of the `Suspense` boundary.
- Add error states with `error.tsx` files.

# Other
 - Unit tests, for both components and the server.
 - End to end tests


# Closing notes
Thank you! This has been a great experience. I really enjoyed playing with this tech stack and learning more about Solace. This assignment has been so much more meaningful and valuable than leetcode style interview work, so thank you for being different!
