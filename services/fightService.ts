import { fetchFights } from "../helper-functions"
import Fight from "../models/Fight"

const fightService = {
  populateDatabase: async () => {
    const fights = await fetchFights()
    try {
      await Fight.insertMany(fights)
    } catch (err) {
      console.log(err);
    }
  },
  getFights: async () => {
    return Fight.find().select({ _id: 0, __v: 0 })
  }
}

export default fightService