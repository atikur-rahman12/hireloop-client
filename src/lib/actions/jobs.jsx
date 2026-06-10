"use server";

export const createJob = async (newJobData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJobData),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Create Job Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};
