from abc import ABC, abstractmethod
from typing import Dict, Any

class BaseAgent(ABC):
    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role

    @abstractmethod
    async def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Execute agent's specific reasoning task given context."""
        pass
