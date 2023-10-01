import Parse from "parse";

export const getAllLessons = () => {
  const Lesson = Parse.Object.extend("Lessons");
  const query = new Parse.Query(Lesson);

  return query.find().then((results) => {
    return results;
  });
};
