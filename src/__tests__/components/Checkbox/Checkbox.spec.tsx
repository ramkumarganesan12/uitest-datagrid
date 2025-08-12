import { fireEvent, render, screen } from "@testing-library/react";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { vi } from "vitest";

const handleChange = vi.fn();

describe("Custom Checkbox which parent controls", () => {
    
    it("should have checked state initially and call handleChange on change", () => {
        
        render(<Checkbox state={"checked"} onChange={handleChange} />);

        const selectAllCheckbox = screen.getByRole("button", { name: "Select or Unselect all rows" });

        expect(selectAllCheckbox).toHaveTextContent("✔");

        fireEvent.click(selectAllCheckbox);

        expect(handleChange).toHaveBeenCalledTimes(1);
    })

    it("should have uchecked state initially", () => {
        
        render(<Checkbox state={"unchecked"} onChange={handleChange} />);

        const selectAllCheckbox = screen.getByRole("button", { name: "Select or Unselect all rows" });

        expect(selectAllCheckbox).toHaveTextContent("");
    });

    it("should have mixed state initially", () => {
        
        render(<Checkbox state={"mixed"} onChange={handleChange} />);

        const selectAllCheckbox = screen.getByRole("button", { name: "Select or Unselect all rows" });

        expect(selectAllCheckbox).toHaveTextContent("—");
    });
})