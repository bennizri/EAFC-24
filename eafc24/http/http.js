import axios from "axios";
const IP = "http://192.168.1.67:5000";

export const http = async () => {
  try {
    console.log("try to fetch");
    const response = await axios.get(`${IP}/player_data`, {});
    console.log("enter to res");
    return response.data;
  } catch (error) {
    console.error("Axios Error:", error.message);
  }
};

export const findPlayer = async (id) => {
  try {
    const response = await axios.get(`${IP}/findPlayer/${id}`);
    console.log("Response from find player");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Axios Error:", error.message);
    throw error;
  }
};

export const findPlayerByName = async (name) => {
  try {
    console.log("try to fetch");
    const response = await axios.get(`${IP}/findPlayerByName/${name}`);
    return response.data;
  } catch (error) {
    console.error("Axios Error:", error.message);
  }
};

export const getUserPrice = async (id) => {
  try {
    const req = `https://www.futbin.com/24/playerPrices?player=${id}`;
    const response = await axios.get(req);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const findCheapestPlayerByRating = async (rating) => {
  try {
    const response = await axios.get(`${IP}/findPlayersByRating/${rating}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const filteredPlayers = async (pos) => {
  try {
    const response = await axios.get(`${IP}/findPlayerByPos/${pos}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
