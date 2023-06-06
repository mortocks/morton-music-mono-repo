import * as Tabs from "@radix-ui/react-tabs";

type Item = {
  label: string;
  content: React.ReactNode;
};

type Props = {
  items?: Item[];
};

const Tab = ({ items = [] }: Props) => (
  <Tabs.Root
    className="TabsRoot [aria-selected='false'] + button"
    defaultValue="tab0"
  >
    <Tabs.List className="TabsList py-2 px-4 " aria-label="Manage your account">
      {items.map((item, index) => (
        <Tabs.Trigger className="TabsTrigger" value={`tab${index}`}>
          {item.label}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
    {items.map((item, index) => (
      <Tabs.Content className="TabsContent" value={`tab${index}`}>
        {item.content}
      </Tabs.Content>
    ))}
  </Tabs.Root>
);

export default Tab;
