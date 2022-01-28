const express = require("express")
const cors = require("cors")
const Redis = require("ioredis");
const redis = new Redis();
const app = express();

app.use(cors())

const configDefault = {
    logo: null,
    companyName: "Enterprise default",
    buttonColor: "danger",
    backgroundColor: "gray"
};

const configs = {
    "test.app.br": {
        logo: "https://s2.glbimg.com/rQohSEpjy2CFEAqov4awvjqDR4c=/620x455/e.glbimg.com/og/ed/f/original/2020/03/27/jure-tovrljan-coronavirus-logos-grey_dezeen_2364_col_8.jpg",
        companyName: "Enterprise 1",
        buttonColor: "primary",
        backgroundColor: "red",
        textColor: "white"
    },
    "test2.app.br": {
        logo: "https://www.logogenio.pt/images/articles/10-best-fashion-logos1.jpg", 
        companyName: "Enterprise 2",
        buttonColor: "warning",
        backgroundColor: "blue",
        textColor: "orange"
    },

}

// Middleware to extract domain site make request api.
app.use((request, response, next) => {
    const domain = request.get('Referrer')
                        .replace(/(http:\/\/|https:\/\/)/, "")
                        .split(":")[0]
    request.domain = domain;
    next();
})

app.get("/configs", async (request, response) => {
    console.log(request.domain)
    let data = await redis.get(request.domain);

    if (data) {
        console.log("get configs in cache")
        return response.json({ data: JSON.parse(data) })
    }

    data = configs[request.domain] || configDefault;
    await redis.set(request.domain, JSON.stringify(data), 'ex', 120)
    return response.json({ data })
})

app.listen(5000, () => console.log("Server is running."))