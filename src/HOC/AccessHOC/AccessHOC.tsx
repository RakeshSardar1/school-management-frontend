import type { ReactNode, ComponentType } from "react";
import type { UserCategory } from "../../utilities/types";
import { USERS_CATEGORY } from "../../redux/ConstantCommon";

// 1. The props your protected component needs (e.g., children if it's a layout)
interface ShellProps {
  children: ReactNode;
}

// 2. The props the HOC expects (role + any props the Wrapped component needs)
interface HocProps extends ShellProps {
  role: UserCategory;
}

// 3. The HOC Function
function withStudentData(Wrapped: ComponentType<ShellProps>) {
  // This returns the new protected component
  return function ComponentWithData({ role, children }: HocProps) {
    // Check if the user's role is allowed

    if (!role) {
      return (
        <Wrapped>
          <div>
            <p>Access Denied: No user exist.</p>
          </div>
        </Wrapped>
      );
    }

    const AllowUser = USERS_CATEGORY.includes(role);

    if (!AllowUser) {
      // If not allowed, render the Wrapped component with the error message
      return (
        <Wrapped>
          <div>
            <p>Access Denied: User does not have permission.</p>
          </div>
        </Wrapped>
      );
    }

    return <Wrapped>{children}</Wrapped>;
  };
}

// 4. The fallback Shell component
function AccessShell({ children }: ShellProps) {
  return (
    <div className="access-shell">
      {/* You can add a sidebar/header here if you want */}
      {children}
    </div>
  );
}

// 5. Create the final exported HOC
const AccessHOC = withStudentData(AccessShell);

export default AccessHOC;
