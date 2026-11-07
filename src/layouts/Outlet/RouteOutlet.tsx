import { memo } from "react";
import { Outlet } from "react-router-dom";

const RouteOutlet = memo(() => <Outlet />);

RouteOutlet.displayName = "RouteOutlet";

export default RouteOutlet;
