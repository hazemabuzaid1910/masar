import { useEffect } from "react";
import axios from "axios";

import { getMentors } from "~/routes/dashboard/mentors/api/mentor.api";
import { useMentorStore } from "~/store/mentor.store";

export function useMentors() {
  const {
    mentors,
    loading,
    error,

    setMentors,
    setLoading,
    setError,
  } = useMentorStore();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        setError(null);

        const mentorsData = await getMentors();

        setMentors(mentorsData);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ||
              "Failed to load mentors"
          );
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [setMentors, setLoading, setError]);

  return {
    mentors,
    loading,
    error,
  };
}