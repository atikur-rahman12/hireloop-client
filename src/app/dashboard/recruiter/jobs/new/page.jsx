import React from "react";
import PostJobForm from "./PostJobForm";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

const PostJobPage = async () => {

  const company = await getLoggedInRecruiterCompany();

  return (
    <div>
      <PostJobForm recruiterCompany={company} />
    </div>
  );
};

export default PostJobPage;
