const supabase = require("../model/supabaseClient");
const TABLE = "questions";

module.exports = {
  createQuestion: async (req, res) => {
    const question = { ...req.body.question };
    const tag = [...req.body.tag].filter((a) => a.name.length > 0);
    const { data, error } = await supabase
      .from(TABLE)
      .insert(question)
      .select("*");

    if (tag.length > 0) {
      const tags = await supabase.from("tags").insert(tag).select();
      if (tags.error) return res.status(501).send("Cannot create question");
      const qt = await supabase.from("question_tag").insert(
        tags.data.map((a) => ({
          question_id: data[0].question_id,
          tag_id: a.id,
        }))
      );
    }

    if (error) {
      return res.status(501).send("Cannot create question");
    }
    return res.status(201).send({ data: data[0] });
  },
  getQuestions: async (req, res) => {
    const { data, error } = await supabase.from("questions")
      .select(`*,answers:answers(*),tags:question_tag(
        tags(
          name
        )
      )`);
    if (error) {
      return res.status(500).send("Cannot get data from db");
    }
    const resData = data.map((a) => ({
      ...a,
      tags: a.tags.map((tag) => tag.tags.name),
    }));

    resData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return res.status(200).send(resData);
  },
  getNewQuestions: async (req, res) => {
    const { data, error } = await supabase.from("questions")
      .select(`*,answers:answers(*),tags:question_tag(
        tags(
          name
        )
      )`);
    if (error) {
      return res.status(500).send("Cannot get data from db");
    }
    const resData = data.map((a) => ({
      ...a,
      tags: a.tags.map((tag) => tag.tags.name),
    }));

    resData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return res.status(200).send(resData.slice(0, 20));
  },
  updateQuestion: async (req, res) => {
    const { id } = req.params;
    const body = { ...req.body };
    delete body.answers;
    delete body.tags;
    const { error } = await supabase
      .from(TABLE)
      .update(body)
      .eq("question_id", id);
    console.log(body);
    if (error) {
      return res.status(500).send("Cannot update data from db");
    }
    return res.status(201).send("ok");
  },
  deleteQuestion: async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from(TABLE).delete().eq("question_id", id);
    if (error) {
      return res.status(500).send("Cannot delete data from db");
    }
    return res.status(204).send("ok");
  },
};
