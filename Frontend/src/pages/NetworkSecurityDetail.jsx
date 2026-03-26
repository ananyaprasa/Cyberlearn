import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { contentApi } from "../api/apiService";

function NetworkSecurityDetail() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await contentApi.getById(id);
        setLesson(data);
      } catch (error) {
        console.error("Error fetching lesson:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  if (loading) return <p>Loading lesson...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!lesson) return <p>Lesson not found</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{lesson.title}</h1>
      <p><strong>Difficulty:</strong> {lesson.difficulty}</p>
      <p><strong>Category:</strong> {lesson.category}</p>
      <hr />
      <p>{lesson.content}</p>
    </div>
  );
}

export default NetworkSecurityDetail;

