import React, { useState } from "react";
import { Form, Dropdown, DropdownButton, Button } from "react-bootstrap";

interface Port {
  id: number;
  name: string;
}

const ports: Port[] = [
  { id: 1, name: "Civitavecchia (Rome), Italy" },
  { id: 2, name: "Miami, United States" },
  { id: 3, name: "Barcelona, Spain" },
  { id: 4, name: "Sydney, Australia" },
];

const PortFilter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPorts, setSelectedPorts] = useState<Port[]>([]);

  const filteredPorts = ports.filter((port) =>
    port.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (port: Port) => {
    if (!selectedPorts.find((selected) => selected.id === port.id)) {
      setSelectedPorts([...selectedPorts, port]);
    }
  };

  const handleRemove = (portId: number) => {
    setSelectedPorts(selectedPorts.filter((port) => port.id !== portId));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <Form.Group controlId="searchPorts">
        <Form.Label>Search and Select Ports</Form.Label>
        <Form.Control
          type="text"
          placeholder="Type to search ports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <DropdownButton
        id="dropdown-ports"
        title="Available Ports"
        className="mt-3"
      >
        {filteredPorts.length > 0 ? (
          filteredPorts.map((port) => (
            <Dropdown.Item key={port.id} onClick={() => handleSelect(port)}>
              {port.name}
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item disabled>No ports found</Dropdown.Item>
        )}
      </DropdownButton>
      <div className="mt-3">
        <h5>Selected Ports:</h5>
        {selectedPorts.length > 0 ? (
          selectedPorts.map((port) => (
            <div
              key={port.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "5px",
                padding: "5px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              <span>{port.name}</span>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemove(port.id)}
              >
                Remove
              </Button>
            </div>
          ))
        ) : (
          <p>No ports selected</p>
        )}
      </div>
    </div>
  );
};

export default PortFilter;
