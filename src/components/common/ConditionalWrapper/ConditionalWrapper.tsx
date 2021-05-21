interface ConditionalWrapperProps {
  children: any;
  condition: boolean;
  wrapper: any;
}

const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({
  condition,
  wrapper,
  children,
}) => (condition ? wrapper(children) : children);

export default ConditionalWrapper;
