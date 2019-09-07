const { GraphQLServer } = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length

const resolvers = {
    Query: {
        info: () => `This is the APi of a Hackernews Clone`,
        feed: () => links,
        link: (id) => links.find(link => link.id === id)
    },

    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            let link = links.find(link => link.id === args.id)
            if (link) {
                let newLink = {
                    ...link,
                    description: args.description,
                    url: args.url
                }
                let index = links.findIndex(link => link.id === args.id)
                links[index] = newLink
                return newLink
            } else {
                return null
            }
        },
        deleteLink: (parent, args) => {
            let index = links.findIndex(link => link.id === args.id)
            if (index) {
                let link = links.splice(index, 1)
                return link
            } else {
                return null
            }
        }
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))