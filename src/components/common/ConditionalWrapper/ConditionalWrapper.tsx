import { ReactNode } from "react";

interface ConditionalWrapperProps {
  children: ReactNode;
  condition: boolean;
  wrapper: any;
}

const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({
  condition,
  wrapper,
  children,
}) => (condition ? wrapper(children) : children);

export default ConditionalWrapper;
