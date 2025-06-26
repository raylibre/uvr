---
to: "<% return path + 'index.ts'%>"
---
import <%= pascalName %> from '~/components/<%= componentType %>s/<%= kebabName %>/<%= kebabName %>.vue';

export default <%= pascalName %>;
