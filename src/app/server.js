// import { createServer, Model } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.namespace = "api";

      this.get("/users", (schema) => schema.users.all());
      
      // To increment the id for each user inserted,
      // Mirage auto creates an id as string if you don't pass one
      let newId = 3
      this.post("/users", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        attrs.id = newId++
        
        return schema.users.create(attrs);
      });

      this.delete("/users/:id", (schema, request) => {
        const id = request.params.id;

        return schema.users.find(id).destroy();
      });
    },
  });

  return server;
}