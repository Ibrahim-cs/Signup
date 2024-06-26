import type { LoaderFunctionArgs } from "react-router-dom";
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useFetcher,
  useRouteLoaderData,
} from "react-router-dom";
import { authProvider } from "./auth";
import SigninForm from "./components/Signin";
import SignupForm from "./components/Signup";
import Dashboard from "./components/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      // Our root route always provides the user, if logged in
      return { user: authProvider.email };
    },
    Component: Layout,
    children: [
      {
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: SigninForm,
      },
      {
        path: "signup",
        action: signupAction,
        loader: signupLoader,
        Component: SignupForm,
      },
      {
        path: "protected",
        loader: protectedLoader,
        Component: Dashboard,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await authProvider.signout();
      return redirect("/");
    },
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

function Layout() {
  return (
    <div>
      <AuthStatus />
      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
        <li>
          <Link to="/signup">
            <button className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Sign Up
            </button>
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

function AuthStatus() {
  // Get our logged in user, if they exist, from the root route loader data
  let { user } = useRouteLoaderData("root") as { user: string | null };
  let fetcher = useFetcher();

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  let isLoggingOut = fetcher.formData != null;

  return (
    <div>
      <p>Welcome {user}!</p>
      <fetcher.Form method="post" action="/logout">
        <button type="submit" disabled={isLoggingOut}>
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </button>
      </fetcher.Form>
    </div>
  );
}

async function loginAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  let email = formData.get("email") as string | null;
  let password = formData.get("password") as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!email) {
    return {
      error: "You must provide a email to log in",
    };
  } else if (!password) {
    return {
      error: "You must provide a password to log in",
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await authProvider.signin(email, password);
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // email/password combinations - just like validating the inputs
    // above
    return {
      error: "Invalid login attempt",
    };
  }

  let redirectTo = formData.get("redirectTo") as string | null;

  return redirect(redirectTo || "/");
}

async function loginLoader() {
  if (authProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

async function signupAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  let email = formData.get("email") as string | null;
  let password = formData.get("password") as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!email) {
    return {
      error: "You must provide a email to log in",
    };
  } else if (!password) {
    return {
      error: "You must provide a password to log in",
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await authProvider.signup(email, password);
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // email/password combinations - just like validating the inputs
    // above
    return {
      error: "Invalid signup attempt",
    };
  }

  let redirectTo = formData.get("redirectTo") as string | null;

  return redirect(redirectTo || "/");
}

async function signupLoader() {
  if (authProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}
