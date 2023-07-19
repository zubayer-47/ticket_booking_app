import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        // <NotFound />
        <div className='h-screen w-full flex place-items-center justify-center items-center'>
          <div className='w-full text-center mx-3 p-4 bg-transparent rounded-xl select-none'>
            <p className='flex justify-center items-center text-3xl md:text-5xl lg:text-7xl gap-2 tracking-widest font-bold text-red-500'>OOPS ERROR!!</p>
            <p className='mt-4 text-lg text-gray-800'>There is Something Wrong Happening!</p>
            <p className='text-md text-gray-600'>Please Reload The Page Again</p>
          </div>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
