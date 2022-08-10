import { express } from "express";
import cors from "cors";
import config from "./config.json";
import dbo from "./db/conn";

const app = express();
const port = config.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});