const supabase = require("../model/supabaseClient");
const TABLE = "answers";

module.exports = {
  createAnswer: async (req, res) => {
    const body = { ...req.body };

    const { data, error } = await supabase.from(TABLE).insert(body).select();
    if (error) {
      return res.status(500).send("Cannot create todo");
    }
    return res.status(201).send(data[0]);
  },
  updateAnswer: async (req, res) => {
    const { id } = req.params;
    const body = { ...req.body };
    const { error } = await supabase.from(TABLE).update(body).eq("id", id);
    if (error) {
      return res.status(500).send("Cannot update data from db");
    }
    return res.status(201).send("ok");
  },
  deleteAnswer: async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from(TABLE).delete().eq("id", id);
    if (error) {
      return res.status(500).send("Cannot delete data from db");
    }
    return res.status(204).send("ok");
  },
};
