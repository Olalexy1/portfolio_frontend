import React, { ReactNode, createContext, useContext, useState } from "react";

interface ThemeContextType {
    contextTheme: string;
    setContextTheme: React.Dispatch<React.SetStateAction<string>>;
}

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [contextTheme, setContextTheme] = useState<string>('dark');

    return (
        <ThemeContext.Provider value={{ contextTheme, setContextTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useContextTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default ThemeContext