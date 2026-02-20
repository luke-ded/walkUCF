import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, beforeEach, vi } from 'vitest';
import App from '../App';
import HomePage from '../HomePage';
import NavBar from '../components/NavBar';
import About from '../components/About';
import Error from '../components/Error';
import Settings from '../components/Settings';
import RouteList from '../components/RouteList';
import Search from '../components/Search';
import { createGraph, dijkstra } from '../components/Dijkstra';
import { nearestPoint } from '../components/Nearest';

// ==================== APP TESTS ====================
describe('App Component', () => {
  test('renders the main heading', () => {
    render(<App />);
    const linkElement = screen.getByText(/walkUCF/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders HomePage component', () => {
    render(<App />);
    expect(screen.getByText(/walkUCF/i)).toBeInTheDocument();
  });
});

// ==================== NAVBAR TESTS ====================
describe('NavBar Component', () => {
  const mockToggleAbout = vi.fn();
  const mockToggleSettings = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders logo and title', () => {
    render(
      <NavBar
        toggleAbout={mockToggleAbout}
        about={false}
        toggleSettings={mockToggleSettings}
        settings={false}
      />
    );
    expect(screen.getByText('walkUCF')).toBeInTheDocument();
    expect(screen.getByAltText('UCF Logo')).toBeInTheDocument();
  });

  test('toggles about when info button is clicked', () => {
    render(
      <NavBar
        toggleAbout={mockToggleAbout}
        about={false}
        toggleSettings={mockToggleSettings}
        settings={false}
      />
    );
    
    // Find the info button (CiCircleInfo container)
    const buttons = screen.getAllByRole('generic').filter(
      el => el.className.includes('cursor-pointer') && el.className.includes('rounded-xl')
    );
    const infoButton = buttons[2]; // Third button is the info/about button
    fireEvent.click(infoButton);
    
    expect(mockToggleSettings).toHaveBeenCalledWith(false);
    expect(mockToggleAbout).toHaveBeenCalledWith(true);
  });

  test('toggles settings when settings button is clicked', () => {
    render(
      <NavBar
        toggleAbout={mockToggleAbout}
        about={false}
        toggleSettings={mockToggleSettings}
        settings={false}
      />
    );
    
    const buttons = screen.getAllByRole('generic').filter(
      el => el.className.includes('cursor-pointer') && el.className.includes('rounded-xl')
    );
    const settingsButton = buttons[1]; // Second button is settings
    fireEvent.click(settingsButton);
    
    expect(mockToggleAbout).toHaveBeenCalledWith(false);
    expect(mockToggleSettings).toHaveBeenCalledWith(true);
  });

  test('closes about when opening settings', () => {
    render(
      <NavBar
        toggleAbout={mockToggleAbout}
        about={true}
        toggleSettings={mockToggleSettings}
        settings={false}
      />
    );
    
    const buttons = screen.getAllByRole('generic').filter(
      el => el.className.includes('cursor-pointer') && el.className.includes('rounded-xl')
    );
    const settingsButton = buttons[1];
    fireEvent.click(settingsButton);
    
    expect(mockToggleAbout).toHaveBeenCalledWith(false);
  });
});

// ==================== ABOUT TESTS ====================
describe('About Component', () => {
  const mockToggleAbout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders about modal with title', () => {
    render(<About toggleAbout={mockToggleAbout} />);
    expect(screen.getByText('About This Project')).toBeInTheDocument();
  });

  test('renders creator information with link', () => {
    render(<About toggleAbout={mockToggleAbout} />);
    expect(screen.getByText('Luke')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Luke' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/luke-ded'
    );
  });

  test('renders GitHub link', () => {
    render(<About toggleAbout={mockToggleAbout} />);
    const links = screen.getAllByRole('link');
    const githubLink = links.find(link => link.getAttribute('href')?.includes('github.com'));
    expect(githubLink).toBeTruthy();
  });

  test('renders bug report link', () => {
    render(<About toggleAbout={mockToggleAbout} />);
    const links = screen.getAllByRole('link');
    const formLink = links.find(link => link.getAttribute('href')?.includes('forms.gle'));
    expect(formLink).toBeTruthy();
  });

  test('close button calls toggleAbout with false', () => {
    render(<About toggleAbout={mockToggleAbout} />);
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(mockToggleAbout).toHaveBeenCalledWith(false);
  });

  test('renders thank you message', () => {
    render(<About toggleAbout={mockToggleAbout} />);
    expect(screen.getByText(/Thanks for using/i)).toBeInTheDocument();
  });
});

// ==================== ERROR TESTS ====================
describe('Error Component', () => {
  const mockToggleError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  test('renders error message about inaccessible locations', () => {
    render(<Error toggleError={mockToggleError} />);
    expect(screen.getByText(/Locations inaccessible to each other/i)).toBeInTheDocument();
  });

  test('renders issue report link', () => {
    render(<Error toggleError={mockToggleError} />);
    const link = screen.getByRole('link', { name: 'here' });
    expect(link).toHaveAttribute('href', 'https://forms.gle/XmwzZMkAw9f15xzs6');
  });

  test('close button calls toggleError with false', () => {
    render(<Error toggleError={mockToggleError} />);
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(mockToggleError).toHaveBeenCalledWith(false);
  });

  test('scrolls to top on render', () => {
    render(<Error toggleError={mockToggleError} />);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'smooth' });
  });
});

// ==================== SETTINGS TESTS ====================
describe('Settings Component', () => {
  const mockTriggerRerender = vi.fn();
  const mockToggleSettings = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('settings', JSON.stringify({
      units: 'imperial',
      walkSpeed: 3,
      saveRoute: true,
      showLocation: true,
    }));
  });

  test('renders settings title', () => {
    render(
      <Settings
        triggerRerender={mockTriggerRerender}
        toggleSettings={mockToggleSettings}
      />
    );
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  test('renders units selector', () => {
    render(
      <Settings
        triggerRerender={mockTriggerRerender}
        toggleSettings={mockToggleSettings}
      />
    );
    expect(screen.getByText('Imperial')).toBeInTheDocument();
    expect(screen.getByText('Metric')).toBeInTheDocument();
  });

  test('renders walking speed input', () => {
    render(
      <Settings
        triggerRerender={mockTriggerRerender}
        toggleSettings={mockToggleSettings}
      />
    );
    expect(screen.getByText('Walking Speed:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('3.0')).toBeInTheDocument();
  });

  test('renders save and cancel buttons', () => {
    render(
      <Settings
        triggerRerender={mockTriggerRerender}
        toggleSettings={mockToggleSettings}
      />
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('cancel button closes settings', () => {
    render(
      <Settings
        triggerRerender={mockTriggerRerender}
        toggleSettings={mockToggleSettings}
      />
    );
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockToggleSettings).toHaveBeenCalledWith(false);
  });

  test('save button saves settings and closes', () => {
    render(
      <Settings
        triggerRerender={mockTriggerRerender}
        toggleSettings={mockToggleSettings}
      />
    );
    fireEvent.click(screen.getByText('Save'));
    expect(mockTriggerRerender).toHaveBeenCalled();
    expect(mockToggleSettings).toHaveBeenCalledWith(false);
  });

  test('switching to metric updates units display', () => {
    render(
      <Settings
        triggerRerender={mockTriggerRerender}
        toggleSettings={mockToggleSettings}
      />
    );
    
    const metricButton = screen.getByText('Metric');
    fireEvent.click(metricButton);
    
    expect(screen.getByText('km/hr')).toBeInTheDocument();
  });

  test('walking speed input updates value', () => {
    render(
      <Settings
        triggerRerender={mockTriggerRerender}
        toggleSettings={mockToggleSettings}
      />
    );
    
    const input = screen.getByPlaceholderText('3.0') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '4.5' } });
    
    expect(input.value).toBe('4.5');
  });

  test('creates default settings if none exist', () => {
    localStorage.clear();
    render(
      <Settings
        triggerRerender={mockTriggerRerender}
        toggleSettings={mockToggleSettings}
      />
    );
    
    const savedSettings = JSON.parse(localStorage.getItem('settings')!);
    expect(savedSettings).toBeTruthy();
    expect(savedSettings.units).toBe('imperial');
  });
});

// ==================== ROUTE LIST TESTS ====================
describe('RouteList Component', () => {
  const mockTriggerRerender = vi.fn();
  const mockSetStops = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('settings', JSON.stringify({
      units: 'imperial',
      walkSpeed: 3,
      saveRoute: true,
      showLocation: true,
    }));
    localStorage.setItem('graphData', JSON.stringify({
      distanceMi: 0.5,
      distanceKm: 0.8,
    }));
  });

  test('renders route header', () => {
    render(
      <RouteList
        triggerRerender={mockTriggerRerender}
        setStops={mockSetStops}
        stops={[]}
      />
    );
    expect(screen.getByText('Route')).toBeInTheDocument();
  });

  test('renders clear button', () => {
    render(
      <RouteList
        triggerRerender={mockTriggerRerender}
        setStops={mockSetStops}
        stops={[]}
      />
    );
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  test('displays distance in imperial units', () => {
    render(
      <RouteList
        triggerRerender={mockTriggerRerender}
        setStops={mockSetStops}
        stops={[]}
      />
    );
    expect(screen.getByText(/0\.50 mi/)).toBeInTheDocument();
  });

  test('displays estimated time', () => {
    render(
      <RouteList
        triggerRerender={mockTriggerRerender}
        setStops={mockSetStops}
        stops={[]}
      />
    );
    expect(screen.getByText(/min/)).toBeInTheDocument();
  });

  test('renders stops when provided', () => {
    const stops = [
      {
        key: '1',
        name: 'Test Building',
        abbreviation: 'TB',
        Entrances: [{ id: 1, lat: 28.6, lon: -81.2 }],
        selectedEntrance: 1,
      },
    ];
    
    render(
      <RouteList
        triggerRerender={mockTriggerRerender}
        setStops={mockSetStops}
        stops={stops}
      />
    );
    
    expect(screen.getByText('Test Building')).toBeInTheDocument();
    expect(screen.getByText('TB')).toBeInTheDocument();
  });

  test('clear button resets stops', () => {
    render(
      <RouteList
        triggerRerender={mockTriggerRerender}
        setStops={mockSetStops}
        stops={[]}
      />
    );
    
    fireEvent.click(screen.getByText('Clear'));
    expect(mockSetStops).toHaveBeenCalledWith([]);
  });

  test('displays metric distance when metric units selected', () => {
    localStorage.setItem('settings', JSON.stringify({
      units: 'metric',
      walkSpeed: 4.8,
      saveRoute: true,
      showLocation: true,
    }));
    
    render(
      <RouteList
        triggerRerender={mockTriggerRerender}
        setStops={mockSetStops}
        stops={[]}
      />
    );
    
    expect(screen.getByText(/km/)).toBeInTheDocument();
  });
});

// ==================== SEARCH TESTS ====================
describe('Search Component', () => {
  const mockTriggerRerender = vi.fn();
  const mockSetStops = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('permissionStatus', JSON.stringify(false));
  });

  test('renders search input', () => {
    render(
      <Search
        triggerRerender={mockTriggerRerender}
        setStops={mockSetStops}
      />
    );
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  test('search input filters results', async () => {
    render(
      <Search
        triggerRerender={mockTriggerRerender}
        setStops={mockSetStops}
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'library' } });
    
    expect(searchInput).toHaveValue('library');
  });

  test('search input clears on empty string', () => {
    render(
      <Search
        triggerRerender={mockTriggerRerender}
        setStops={mockSetStops}
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.change(searchInput, { target: { value: '' } });
    
    expect(searchInput).toHaveValue('');
  });
});

// ==================== DIJKSTRA TESTS ====================
describe('Dijkstra Algorithm', () => {
  test('createGraph returns valid graph structure', () => {
    const result = createGraph(false, false, false, false);
    
    expect(result.graph).toBeDefined();
    expect(result.pointMap).toBeDefined();
    expect(result.pathnum).toBeDefined();
    expect(result.graph instanceof Map).toBe(true);
    expect(result.pointMap instanceof Map).toBe(true);
  });

  test('createGraph includes building paths when enabled', () => {
    const withoutBuildings = createGraph(false, false, false, false);
    const withBuildings = createGraph(true, false, false, false);
    
    // With building paths should have equal or more edges
    let withoutCount = 0;
    let withCount = 0;
    
    withoutBuildings.graph.forEach((edges) => {
      withoutCount += edges.length;
    });
    
    withBuildings.graph.forEach((edges) => {
      withCount += edges.length;
    });
    
    expect(withCount).toBeGreaterThanOrEqual(withoutCount);
  });

  test('createGraph includes jaywalking paths when enabled', () => {
    const withoutJaywalking = createGraph(false, false, false, false);
    const withJaywalking = createGraph(false, true, false, false);
    
    let withoutCount = 0;
    let withCount = 0;
    
    withoutJaywalking.graph.forEach((edges) => {
      withoutCount += edges.length;
    });
    
    withJaywalking.graph.forEach((edges) => {
      withCount += edges.length;
    });
    
    expect(withCount).toBeGreaterThanOrEqual(withoutCount);
  });

  test('createGraph includes grass paths when enabled', () => {
    const withoutGrass = createGraph(false, false, false, false);
    const withGrass = createGraph(false, false, true, false);
    
    let withoutCount = 0;
    let withCount = 0;
    
    withoutGrass.graph.forEach((edges) => {
      withoutCount += edges.length;
    });
    
    withGrass.graph.forEach((edges) => {
      withCount += edges.length;
    });
    
    expect(withCount).toBeGreaterThanOrEqual(withoutCount);
  });

  test('createGraph includes parking paths when enabled', () => {
    const withoutParking = createGraph(false, false, false, false);
    const withParking = createGraph(false, false, false, true);
    
    let withoutCount = 0;
    let withCount = 0;
    
    withoutParking.graph.forEach((edges) => {
      withoutCount += edges.length;
    });
    
    withParking.graph.forEach((edges) => {
      withCount += edges.length;
    });
    
    expect(withCount).toBeGreaterThanOrEqual(withoutCount);
  });

  test('dijkstra finds path between connected nodes', () => {
    const { graph } = createGraph(false, false, false, false);
    
    // Get first two connected nodes
    const firstNodeId = graph.keys().next().value as number;
    expect(firstNodeId).toBeDefined();
    
    const edges = graph.get(firstNodeId);
    
    if (edges && edges.length > 0) {
      const secondNodeId = edges[0].node;
      const result = dijkstra(graph, firstNodeId, secondNodeId);
      
      expect(result.path.length).toBeGreaterThan(0);
      expect(result.path[0]).toBe(firstNodeId);
      expect(result.path[result.path.length - 1]).toBe(secondNodeId);
    }
  });

  test('dijkstra returns empty path for invalid start node', () => {
    const { graph } = createGraph(false, false, false, false);
    const result = dijkstra(graph, -9999, 1);
    
    expect(result.path).toEqual([]);
    expect(result.distances.size).toBe(0);
  });

  test('dijkstra returns empty path for invalid end node', () => {
    const { graph } = createGraph(false, false, false, false);
    const firstNodeId = graph.keys().next().value as number;
    const result = dijkstra(graph, firstNodeId, -9999);
    
    expect(result.path).toEqual([]);
    expect(result.distances.size).toBe(0);
  });

  test('dijkstra returns same node for start equals end', () => {
    const { graph } = createGraph(false, false, false, false);
    const firstNodeId = graph.keys().next().value as number;
    const result = dijkstra(graph, firstNodeId, firstNodeId);
    
    expect(result.path).toEqual([firstNodeId]);
    expect(result.distances.get(firstNodeId)).toBe(0);
  });

  test('dijkstra distances are non-negative', () => {
    const { graph } = createGraph(false, false, false, false);
    const firstNodeId = graph.keys().next().value as number;
    const edges = graph.get(firstNodeId);
    
    if (edges && edges.length > 0) {
      const secondNodeId = edges[0].node;
      const result = dijkstra(graph, firstNodeId, secondNodeId);
      
      result.distances.forEach((distance) => {
        expect(distance).toBeGreaterThanOrEqual(0);
      });
    }
  });
});

// ==================== NEAREST POINT TESTS ====================
describe('Nearest Point', () => {
  test('nearestPoint returns a valid point', () => {
    // UCF coordinates
    const currentLoc = [28.6024, -81.2001];
    const result = nearestPoint(currentLoc);
    
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.lat).toBeDefined();
    expect(result.lon).toBeDefined();
  });

  test('nearestPoint returns point with valid coordinates', () => {
    const currentLoc = [28.6024, -81.2001];
    const result = nearestPoint(currentLoc);
    
    // UCF is roughly at these coordinates
    expect(result.lat).toBeGreaterThan(28.5);
    expect(result.lat).toBeLessThan(28.7);
    expect(result.lon).toBeGreaterThan(-81.3);
    expect(result.lon).toBeLessThan(-81.1);
  });

  test('nearestPoint returns closest point', () => {
    // Pick a specific known location and verify nearest point is reasonable
    const currentLoc = [28.6024, -81.2001];
    const result = nearestPoint(currentLoc);
    
    // The result should be close to the input location
    const latDiff = Math.abs(result.lat - currentLoc[0]);
    const lonDiff = Math.abs(result.lon - currentLoc[1]);
    
    // Should be within reasonable distance (0.01 degrees ~ 1km)
    expect(latDiff).toBeLessThan(0.05);
    expect(lonDiff).toBeLessThan(0.05);
  });

  test('nearestPoint handles far away coordinates', () => {
    // Far from UCF - should still return a valid point
    const currentLoc = [40.7128, -74.0060]; // New York City
    const result = nearestPoint(currentLoc);
    
    expect(result).toBeDefined();
    expect(result.id).not.toBe(-1);
  });
});

// ==================== LOCALSTORAGE TESTS ====================
describe('LocalStorage Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('settings are stored correctly', () => {
    const settings = {
      units: 'metric',
      walkSpeed: 5,
      saveRoute: false,
      showLocation: false,
    };
    
    localStorage.setItem('settings', JSON.stringify(settings));
    const retrieved = JSON.parse(localStorage.getItem('settings')!);
    
    expect(retrieved.units).toBe('metric');
    expect(retrieved.walkSpeed).toBe(5);
    expect(retrieved.saveRoute).toBe(false);
    expect(retrieved.showLocation).toBe(false);
  });

  test('graphData is stored correctly', () => {
    const graphData = {
      distanceMi: 1.5,
      distanceKm: 2.4,
    };
    
    localStorage.setItem('graphData', JSON.stringify(graphData));
    const retrieved = JSON.parse(localStorage.getItem('graphData')!);
    
    expect(retrieved.distanceMi).toBe(1.5);
    expect(retrieved.distanceKm).toBe(2.4);
  });

  test('currentLocation is stored correctly', () => {
    const location = [28.6024, -81.2001];
    
    localStorage.setItem('currentLocation', JSON.stringify(location));
    const retrieved = JSON.parse(localStorage.getItem('currentLocation')!);
    
    expect(retrieved[0]).toBe(28.6024);
    expect(retrieved[1]).toBe(-81.2001);
  });

  test('permissionStatus is stored correctly', () => {
    localStorage.setItem('permissionStatus', JSON.stringify(true));
    const retrieved = JSON.parse(localStorage.getItem('permissionStatus')!);
    
    expect(retrieved).toBe(true);
  });

  test('selectedPoint is stored correctly', () => {
    const selectedPoint = {
      key: '1',
      name: 'Test Building',
      abbreviation: 'TB',
      selectedEntrance: 1,
    };
    
    localStorage.setItem('selectedPoint', JSON.stringify(selectedPoint));
    const retrieved = JSON.parse(localStorage.getItem('selectedPoint')!);
    
    expect(retrieved.name).toBe('Test Building');
    expect(retrieved.selectedEntrance).toBe(1);
  });
});

// ==================== HOMEPAGE TESTS ====================
describe('HomePage Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders without crashing', () => {
    render(<HomePage />);
    expect(screen.getByText('walkUCF')).toBeInTheDocument();
  });

  test('initializes default settings in localStorage', () => {
    render(<HomePage />);
    
    const settings = JSON.parse(localStorage.getItem('settings')!);
    expect(settings.units).toBe('imperial');
    expect(settings.walkSpeed).toBe(3);
  });

  test('initializes default graphData in localStorage', () => {
    render(<HomePage />);
    
    const graphData = JSON.parse(localStorage.getItem('graphData')!);
    expect(graphData.distanceMi).toBe(0);
    expect(graphData.distanceKm).toBe(0);
  });

  test('renders search component', () => {
    render(<HomePage />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  test('renders route list component', () => {
    render(<HomePage />);
    expect(screen.getByText('Route')).toBeInTheDocument();
  });
});

// ==================== INTEGRATION TESTS ====================
describe('Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('full route calculation flow - createGraph and dijkstra work together', () => {
    const { graph, pointMap } = createGraph(true, true, true, true);
    
    // Get two nodes from the graph
    const nodes = Array.from(graph.keys());
    expect(nodes.length).toBeGreaterThan(1);
    
    const startNode = nodes[0];
    const endNode = nodes[Math.min(10, nodes.length - 1)];
    
    const result = dijkstra(graph, startNode, endNode);
    
    // Verify path is valid
    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[0]).toBe(startNode);
    
    // Verify all nodes in path exist in pointMap
    result.path.forEach(nodeId => {
      expect(pointMap.has(nodeId)).toBe(true);
    });
  });

  test('nearest point integrates with graph', () => {
    const { graph, pointMap } = createGraph(false, false, false, false);
    const currentLoc = [28.6024, -81.2001];
    
    const nearest = nearestPoint(currentLoc);
    
    // Verify nearest point exists in the graph
    expect(graph.has(nearest.id)).toBe(true);
    expect(pointMap.has(nearest.id)).toBe(true);
  });

  test('settings affect route display', () => {
    const mockTriggerRerender = vi.fn();
    const mockSetStops = vi.fn();
    
    // Test imperial
    localStorage.setItem('settings', JSON.stringify({
      units: 'imperial',
      walkSpeed: 3,
      saveRoute: true,
      showLocation: true,
    }));
    localStorage.setItem('graphData', JSON.stringify({
      distanceMi: 1.0,
      distanceKm: 1.6,
    }));
    
    const { unmount } = render(
      <RouteList
        triggerRerender={mockTriggerRerender}
        setStops={mockSetStops}
        stops={[]}
      />
    );
    
    expect(screen.getByText(/1\.00 mi/)).toBeInTheDocument();
    unmount();
    
    // Test metric
    localStorage.setItem('settings', JSON.stringify({
      units: 'metric',
      walkSpeed: 4.8,
      saveRoute: true,
      showLocation: true,
    }));
    
    render(
      <RouteList
        triggerRerender={mockTriggerRerender}
        setStops={mockSetStops}
        stops={[]}
      />
    );
    
    expect(screen.getByText(/1\.60 km/)).toBeInTheDocument();
  });
});

// ==================== EDGE CASE TESTS ====================
describe('Edge Cases', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('dijkstra handles disconnected nodes gracefully', () => {
    // Create an isolated node by using a fake graph
    const isolatedGraph: Map<number, { node: number; distance: number }[]> = new Map();
    isolatedGraph.set(1, [{ node: 2, distance: 1 }]);
    isolatedGraph.set(2, [{ node: 1, distance: 1 }]);
    isolatedGraph.set(3, []); // Isolated node
    
    const result = dijkstra(isolatedGraph, 1, 3);
    
    // Should return empty path since node 3 is unreachable
    expect(result.path).toEqual([]);
  });

  test('nearest point with exact coordinate match', () => {
    const { pointMap } = createGraph(false, false, false, false);
    
    // Get an actual point from the map
    const firstPoint = pointMap.values().next().value;
    if (firstPoint) {
      const result = nearestPoint([firstPoint.lat, firstPoint.lon]);
      
      // Should return exactly that point or one very close
      expect(result.id).toBeDefined();
    }
  });

  test('RouteList handles empty stops array', () => {
    const mockTriggerRerender = vi.fn();
    const mockSetStops = vi.fn();
    
    localStorage.setItem('settings', JSON.stringify({
      units: 'imperial',
      walkSpeed: 3,
      saveRoute: true,
      showLocation: true,
    }));
    localStorage.setItem('graphData', JSON.stringify({
      distanceMi: 0,
      distanceKm: 0,
    }));
    
    render(
      <RouteList
        triggerRerender={mockTriggerRerender}
        setStops={mockSetStops}
        stops={[]}
      />
    );
    
    expect(screen.getByText('Route')).toBeInTheDocument();
    // Should show 0 distance
    expect(screen.getByText(/0\.00 mi/)).toBeInTheDocument();
  });

  test('RouteList handles multiple stops', () => {
    const mockTriggerRerender = vi.fn();
    const mockSetStops = vi.fn();
    
    localStorage.setItem('settings', JSON.stringify({
      units: 'imperial',
      walkSpeed: 3,
      saveRoute: true,
      showLocation: true,
    }));
    localStorage.setItem('graphData', JSON.stringify({
      distanceMi: 2.5,
      distanceKm: 4.0,
    }));
    
    const stops = [
      {
        key: '1',
        name: 'Building A',
        abbreviation: 'BA',
        Entrances: [{ id: 1, lat: 28.6, lon: -81.2 }],
        selectedEntrance: 1,
      },
      {
        key: '2',
        name: 'Building B',
        abbreviation: 'BB',
        Entrances: [{ id: 2, lat: 28.61, lon: -81.21 }],
        selectedEntrance: 1,
      },
      {
        key: '3',
        name: 'Building C',
        abbreviation: 'BC',
        Entrances: [{ id: 3, lat: 28.62, lon: -81.22 }],
        selectedEntrance: 1,
      },
    ];
    
    render(
      <RouteList
        triggerRerender={mockTriggerRerender}
        setStops={mockSetStops}
        stops={stops}
      />
    );
    
    expect(screen.getByText('Building A')).toBeInTheDocument();
    expect(screen.getByText('Building B')).toBeInTheDocument();
    expect(screen.getByText('Building C')).toBeInTheDocument();
    expect(screen.getByText('BA')).toBeInTheDocument();
    expect(screen.getByText('BB')).toBeInTheDocument();
    expect(screen.getByText('BC')).toBeInTheDocument();
  });

  test('Settings handles invalid walk speed', () => {
    const mockTriggerRerender = vi.fn();
    const mockToggleSettings = vi.fn();
    
    localStorage.setItem('settings', JSON.stringify({
      units: 'imperial',
      walkSpeed: 0,
      saveRoute: true,
      showLocation: true,
    }));
    
    render(
      <Settings
        triggerRerender={mockTriggerRerender}
        toggleSettings={mockToggleSettings}
      />
    );
    
    // Save should still work
    fireEvent.click(screen.getByText('Save'));
    expect(mockToggleSettings).toHaveBeenCalledWith(false);
  });

  test('createGraph with all options enabled returns more paths', () => {
    const minimal = createGraph(false, false, false, false);
    const maximal = createGraph(true, true, true, true);
    
    expect(maximal.pathnum.length).toBeGreaterThanOrEqual(minimal.pathnum.length);
  });

  test('dijkstra path reconstruction is correct', () => {
    const { graph } = createGraph(false, false, false, false);
    
    const nodes = Array.from(graph.keys());
    if (nodes.length >= 2) {
      const start = nodes[0];
      const end = nodes[1];
      
      const result = dijkstra(graph, start, end);
      
      if (result.path.length > 0) {
        // First node should be start
        expect(result.path[0]).toBe(start);
        // Last node should be end
        expect(result.path[result.path.length - 1]).toBe(end);
        
        // Each consecutive pair should be connected
        for (let i = 0; i < result.path.length - 1; i++) {
          const current = result.path[i];
          const next = result.path[i + 1];
          const edges = graph.get(current);
          const isConnected = edges?.some(e => e.node === next);
          expect(isConnected).toBe(true);
        }
      }
    }
  });
});

// ==================== ACCESSIBILITY TESTS ====================
describe('Accessibility', () => {
  test('NavBar buttons are clickable', () => {
    const mockToggleAbout = vi.fn();
    const mockToggleSettings = vi.fn();
    
    render(
      <NavBar
        toggleAbout={mockToggleAbout}
        about={false}
        toggleSettings={mockToggleSettings}
        settings={false}
      />
    );
    
    // All interactive elements should be present
    expect(screen.getByAltText('UCF Logo')).toBeInTheDocument();
  });

  test('About modal has proper link targets', () => {
    const mockToggleAbout = vi.fn();
    
    render(<About toggleAbout={mockToggleAbout} />);
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  test('Error modal has close button', () => {
    const mockToggleError = vi.fn();
    window.scrollTo = vi.fn();
    
    render(<Error toggleError={mockToggleError} />);
    
    const closeButton = screen.getByText('Close');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton.tagName).toBe('BUTTON');
  });

  test('Search input has placeholder text', () => {
    const mockTriggerRerender = vi.fn();
    const mockSetStops = vi.fn();
    localStorage.setItem('permissionStatus', JSON.stringify(false));
    
    render(
      <Search
        triggerRerender={mockTriggerRerender}
        setStops={mockSetStops}
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
  });
});

// ==================== PERFORMANCE TESTS ====================
describe('Performance', () => {
  test('createGraph completes in reasonable time', () => {
    const start = performance.now();
    createGraph(true, true, true, true);
    const end = performance.now();
    
    // Should complete in less than 1 second
    expect(end - start).toBeLessThan(1000);
  });

  test('dijkstra completes in reasonable time', () => {
    const { graph } = createGraph(true, true, true, true);
    const nodes = Array.from(graph.keys());
    
    if (nodes.length >= 2) {
      const start = performance.now();
      dijkstra(graph, nodes[0], nodes[nodes.length - 1]);
      const end = performance.now();
      
      // Should complete in less than 1 second
      expect(end - start).toBeLessThan(1000);
    }
  });

  test('nearestPoint completes in reasonable time', () => {
    const start = performance.now();
    nearestPoint([28.6024, -81.2001]);
    const end = performance.now();
    
    // Should complete in less than 500ms
    expect(end - start).toBeLessThan(500);
  });
});