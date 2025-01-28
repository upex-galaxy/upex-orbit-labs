import Link from "next/link"

const components = [
  { name: "Buttons", href: "/buttons" },
  { name: "Text-box", href: "/text-box" },
  { name: "Dropdowns", href: "/dropdowns" },
  { name: "Sliders", href: "/sliders" },
  { name: "Forms", href: "/forms" },
  { name: "Drag and Drop", href: "/drag-and-drop" },
  { name: "Upload/Download", href: "/upload-download" },
  { name: "Static Table", href: "/static-table" },
  { name: "Orbit Labs", href: "/orbit-labs" },
]

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-[#00FFFF]">QA Practice Components</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component) => (
          <Link
            key={component.name}
            href={component.href}
            className="block p-6 bg-[#1A2C5A] rounded-lg shadow-md hover:bg-[#2A3C6A] transition-colors"
          >
            <h2 className="text-xl font-semibold text-[#00FFFF]">{component.name}</h2>
            <p className="mt-2 text-gray-300">Practice with {component.name.toLowerCase()} components</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

