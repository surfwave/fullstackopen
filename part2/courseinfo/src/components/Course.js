const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map((part) => {
        return (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        );
      })}
      <p>
        <strong>
          total of&nbsp;
          {course.parts.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.exercises;
          }, 0)}
          &nbsp;exercises
        </strong>
      </p>
    </div>
  );
};

export default Course;
