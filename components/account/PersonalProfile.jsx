import { auth } from "@/auth";
import { getUserInfo } from "@/database/userQuery";
import Link from "next/link";

const PersonalProfile = async () => {
  const session = await auth();
  const { userInfo, error } = await getUserInfo(
    session?.user?.id || session?.user?._id
  );

  return (
    <div className="shadow rounded bg-white px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4">
        {error && <span className="text-red-500 text-sm">{error}</span>}
        <h3 className="font-medium text-gray-800 text-lg">Personal Profile</h3>
        <Link href="/account/edit" className="text-primary">
          Edit
        </Link>
      </div>
      {userInfo && (
        <div className="space-y-1 text-gray-500">
          <h4 className=" font-medium">{userInfo?.name}</h4>
          <p className="">{userInfo?.email}</p>
          {userInfo?.mobile && <p className="">{userInfo.mobile}</p>}
          {userInfo?.dob && (
            <p className="">
              Date of birth: {new Date(userInfo?.dob).toDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalProfile;
