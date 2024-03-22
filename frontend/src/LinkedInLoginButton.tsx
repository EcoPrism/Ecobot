import React from "react";

interface LinkedInLoginButtonProps {
  onLoginSuccess: (data: any) => void;
  onLoginFailure: (error: any) => void;
}

const LinkedInLoginButton: React.FC<LinkedInLoginButtonProps> = ({
  onLoginSuccess,
  onLoginFailure,
}) => {
  const handleSuccess = (data: any) => {
    onLoginSuccess(data);
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86gnz36rjrwspk&redirect_uri=http://127.0.0.1:50505/&state=STATE&scope=profile`;
  };

  const handleFailure = (error: any) => {

    onLoginFailure(error);
  };

  return (
    <button
      onClick={() => handleSuccess({})}
      style={{
        backgroundColor: "#0077B5",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Log in with LinkedIn
    </button>
  );
};

export default LinkedInLoginButton;