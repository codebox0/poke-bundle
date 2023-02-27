
export async function handler(req, res) {
    const {method} = req;

    switch (method) {
        case "GET":
            // res.status(200).json(todos);
            const response = await fetch('http://localhost:3000/api/pokemons');
            const data = await response.status(200).json();
            break;
        // case "POST":
        //     const { todo, completed } = req.body;
        //     todos.push({
        //         id: todos.length + 1,
        //         todo,
        //         completed,
        //     });
        //     res.status(200).json(todos);
        //     break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}