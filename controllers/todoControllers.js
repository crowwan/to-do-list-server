const supabase = require("../model/supabaseClient");
const TABLE = "todos";

module.exports = {
  createTodos: async (req, res) => {
    const body = { ...req.body };
    if (!body.uid) body.uid = req.uid;
    const { data, error } = await supabase.from(TABLE).insert(body).select();
    if (error) {
      return res.status(500).send("Cannot create todo");
    }
    return res.status(201).send(data);
  },
  getTodos: async (req, res) => {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("uid", req.uid);
    if (error) {
      return res.status(500).send("Cannot get data from db");
    }
    return res.status(200).send(data);
  },
  updateTodos: async (req, res) => {
    const { id } = req.params;
    const body = { ...req.body };
    const { error } = await supabase.from(TABLE).update(body).eq("id", id);
    if (error) {
      return res.status(500).send("Cannot update data from db");
    }
    return res.status(201).send("ok");
  },
  deleteTodos: async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from(TABLE).delete().eq("id", id);
    if (error) {
      return res.status(500).send("Cannot delete data from db");
    }
    return res.status(204).send("ok");
  },
};
