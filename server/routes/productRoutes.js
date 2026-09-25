const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const defaultTechProducts = [
  { id: 1, title: 'Sapphire Pro Wireless Earbuds', price: 49.99, category: 'Wireless Earbuds', description: 'Active noise cancellation with 40h battery life.', image: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFBybyUyMFdpcmVsZXNzJTIwRWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 2, title: 'Studio Elite Headphones', price: 89.99, category: 'Headphones', description: 'Over-ear studio sound with high-res audio.', image: 'https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 3, title: 'RGB Mechanical Keyboard', price: 65.00, category: 'Mechanical Keyboards', description: 'Hot-swappable switches with customizable RGB lighting.', image: 'https://images.unsplash.com/photo-1674036373727-50eb89eed019?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFJHQiUyME1lY2hhbmljYWwlMjBLZXlib2FyZHxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 4, title: 'Ergonomic Wireless Mouse', price: 34.99, category: 'Wireless Mouse', description: 'Precision optical sensor with ultra-quiet clicks.', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60' },
  { id: 5, title: 'Aluminum Laptop Stand', price: 29.99, category: 'Laptop Stands', description: 'Adjustable ergonomic stand for better cooling and posture.', image: 'https://images.unsplash.com/photo-1623251609314-97cc1f84e3ed?w=500&auto=format&fit=crop&q=60' },
  { id: 6, title: '7-in-1 USB-C Hub', price: 42.50, category: 'USB-C Hubs', description: '4K HDMI, Power Delivery, USB 3.0 ports, and card readers.', image: 'https://images.unsplash.com/photo-1760376789487-994070337c76?w=500&auto=format&fit=crop&q=60' },
  { id: 7, title: '1080p HD Webcam', price: 39.99, category: 'Webcams', description: 'Crystal clear video calling with built-in microphone.', image: 'https://images.unsplash.com/photo-1750975314977-374f2290db53?w=500&auto=format&fit=crop&q=60' },
  { id: 8, title: '20,000mAh Power Bank', price: 45.00, category: 'Power Banks', description: 'Fast charging dual USB-C ports for all your devices.', image: 'https://images.unsplash.com/photo-1577538926210-fc6cc624fde2?w=500&auto=format&fit=crop&q=60' },
  { id: 9, title: '67W Fast Phone Charger', price: 22.00, category: 'Phone Chargers', description: 'GaN technology compact charger for phones and laptops.', image: 'https://images.unsplash.com/photo-1731616103600-3fe7ccdc5a59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8NjVXJTIwRmFzdCUyMFBob25lJTIwQ2hhcmdlcnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 10, title: 'Sapphire Smart Watch Pro', price: 79.99, category: 'Smart Watches', description: 'Fitness tracking, heart rate monitor, and AMOLED display.', image: 'https://images.unsplash.com/photo-1655215920713-94440bf7213f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8U21hcnQlMjBXYXRjaCUyMFByb3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 11, title: 'LED Minimalist Desk Lamp', price: 35.00, category: 'Desk Lamps', description: 'Touch control brightness and color temperature adjustment.', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&auto=format&fit=crop&q=60' },
  { id: 12, title: 'Waterproof Laptop Sleeve', price: 25.00, category: 'Laptop Sleeves/Bags', description: 'Shockproof padded protection for up to 15.6-inch laptops.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60' },
  { id: 13, title: 'Bluetooth Portable Speaker', price: 38.00, category: 'Bluetooth Speakers', description: 'Rich 360-degree sound with 12h playback, splash resistant.', image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Qmx1ZXRvb3RoJTIwUG9ydGFibGUlMjBTcGVha2VyfGVufDB8fDB8fHww' },
  { id: 14, title: 'Gaming Mouse Pad XL', price: 18.00, category: 'Mouse Pads', description: 'Extended stitched-edge surface for smooth precise tracking.', image: 'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=500&auto=format&fit=crop&q=60' },
  { id: 15, title: '15W Wireless Charging Pad', price: 24.99, category: 'Wireless Chargers', description: 'Fast Qi charging for phones, earbuds, and watches.', image: 'https://images.unsplash.com/photo-1600490722773-35753aea6332?w=500&auto=format&fit=crop&q=60' },
  { id: 16, title: '4K HDMI Cable 2m', price: 12.00, category: 'Cables', description: 'High-speed braided cable with 4K@60Hz support.', image: 'https://images.unsplash.com/photo-1604005366359-2f8f2a044336?w=500&auto=format&fit=crop&q=60' },
  { id: 17, title: 'USB-C SD Card Reader', price: 16.50, category: 'Card Readers', description: 'Fast multi-slot reader for SD, microSD, and CF cards.', image: 'https://plus.unsplash.com/premium_photo-1760531797911-f7b07b9572f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8VVNCLUMlMjBTRCUyMENhcmQlMjBSZWFkZXJ8ZW58MHx8MHx8fDA%3D' },
  { id: 18, title: 'Laptop Cooling Pad', price: 27.00, category: 'Cooling Pads', description: 'Dual quiet fans with adjustable height for better airflow.', image: 'https://media.istockphoto.com/id/2158717888/photo/external-laptop-cooler-isolated-on-white-background-side-view-with-copy-space.webp?a=1&b=1&s=612x612&w=0&k=20&c=cy8JcDGQkQ9hJosut_Payu04tcF94E-VOGHMXssj4vo=' },
  { id: 19, title: 'VR Headset Pro', price: 199.00, category: 'VR Headsets', description: 'Immersive wide field-of-view display with adjustable straps.', image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=500&auto=format&fit=crop&q=60' },
  { id: 20, title: 'Mini Foldable Drone', price: 89.00, category: 'Drones', description: 'HD camera drone with foldable arms and one-key return.', image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&auto=format&fit=crop&q=60' },
  { id: 21, title: 'Ergonomic Gaming Chair', price: 179.00, category: 'Gaming Chairs', description: 'Adjustable lumbar support with reclining backrest.', image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&auto=format&fit=crop&q=60' },
  { id: 22, title: 'USB Condenser Microphone', price: 55.00, category: 'Microphones', description: 'Studio-quality podcast mic with cardioid pickup pattern.', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop&q=60' },
  { id: 23, title: 'LED Ring Light 10-inch', price: 32.00, category: 'Ring Lights', description: 'Adjustable brightness ring light with flexible phone mount.', image: 'https://plus.unsplash.com/premium_photo-1684611913202-479ff05703da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwUmluZyUyMExpZ2h0JTIwMTAtaW5jaHxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 24, title: 'Flexible Phone Tripod', price: 15.00, category: 'Tripods', description: 'Bendable legs grip any surface for stable shots.', image: 'https://media.istockphoto.com/id/1311068598/photo/a-small-desktop-tripod-that-holds-a-smartphone.webp?a=1&b=1&s=612x612&w=0&k=20&c=sjkROJm3MoPHvIEznFPPMtOhn34OW0NbDe3LVomwTag=' },
  { id: 25, title: '128GB USB Flash Drive', price: 14.00, category: 'Flash Drives', description: 'High-speed USB 3.1 storage with metal casing.', image: 'https://images.unsplash.com/photo-1551818014-7c8ace9c1b5c?w=500&auto=format&fit=crop&q=60' },
  { id: 26, title: '1TB Portable External SSD', price: 95.00, category: 'External SSDs', description: 'Ultra-fast transfer speeds in a pocket-sized drive.', image: 'https://images.unsplash.com/photo-1721333084639-0f64b0583875?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8MVRCJTIwUG9ydGFibGUlMjBFeHRlcm5hbCUyMFNTRHxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 27, title: 'Dual-Band WiFi Router', price: 58.00, category: 'WiFi Routers', description: 'Whole-home coverage with dual-band gigabit speeds.', image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500&auto=format&fit=crop&q=60' },
  { id: 28, title: 'Smart WiFi Plug', price: 13.50, category: 'Smart Plugs', description: 'App and voice controlled outlet with energy monitoring.', image: 'https://plus.unsplash.com/premium_photo-1729491126297-be4bc55e0197?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFNtYXJ0JTIwV2lGaSUyMFBsdWd8ZW58MHx8MHx8fDA%3D' },
  { id: 29, title: 'Digital Graphics Drawing Tablet', price: 68.00, category: 'Graphics Tablets', description: 'Pressure-sensitive pen tablet for digital art and design.', image: 'https://images.unsplash.com/photo-1621009063622-4467e453c3c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fERpZ2l0YWwlMjBHcmFwaGljcyUyMERyYXdpbmclMjBUYWJsZXR8ZW58MHx8MHx8fDA%3D' },
  { id: 30, title: 'Shockproof Phone Case', price: 17.00, category: 'Phone Cases', description: 'Military-grade drop protection with raised bezel edges.', image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=500&auto=format&fit=crop&q=60' },
  { id: 31, title: 'Magnetic Car Phone Mount', price: 19.99, category: 'Car Mounts', description: 'Strong magnetic dashboard mount for secure hands-free driving.', image: 'https://images.unsplash.com/photo-1708766896345-fe51d8845ae3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWFnbmV0aWMlMjBDYXIlMjBQaG9uZSUyME1vdW50JTVDfGVufDB8fDB8fHww' },
  { id: 32, title: 'Bluetooth 5.3 USB Adapter', price: 11.00, category: 'Bluetooth Adapters', description: 'Compact dongle adds Bluetooth to any desktop PC.', image: 'https://media.istockphoto.com/id/479141898/photo/usb-network-adapter.webp?a=1&b=1&s=612x612&w=0&k=20&c=XSMzeArIouVahFsEeUn1SVYmoam08XijolYwFUqpni0=' },
  { id: 33, title: 'Wireless Gaming Controller', price: 44.00, category: 'Gaming Controllers', description: 'Ergonomic grip with responsive triggers and low-latency link.', image: 'https://images.unsplash.com/flagged/photo-1580234820596-0876d136e6d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8V2lyZWxlc3MlMjBHYW1pbmclMjBDb250cm9sbGVyfGVufDB8fDB8fHww' },
  { id: 34, title: 'Adjustable Monitor Stand', price: 33.00, category: 'Monitor Stands', description: 'Riser stand with under-storage for a tidy desk setup.', image: 'https://images.unsplash.com/photo-1629317480826-910f729d1709?w=500&auto=format&fit=crop&q=60' },
  { id: 35, title: 'Desk Cable Organizer Box', price: 16.00, category: 'Cable Organizers', description: 'Hides power strips and cables for a clean workspace.', image: 'https://images.unsplash.com/photo-1639675960002-2f414c58ed79?w=500&auto=format&fit=crop&q=60' },
  { id: 36, title: '15.6" Portable Monitor', price: 129.00, category: 'Portable Monitors', description: 'Slim USB-C display for laptops, consoles, and phones.', image: 'https://plus.unsplash.com/premium_photo-1681718166365-9ae0a5d208a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8MTUuNiUyMiUyMFBvcnRhYmxlJTIwTW9uaXRvcnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 37, title: 'Active Noise Cancelling Earbuds', price: 59.99, category: 'Wireless Earbuds', description: 'Deep bass with adaptive ANC and touch controls.', image: 'https://images.unsplash.com/photo-1611864583067-b002fdc4fa29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fEFjdGl2ZSUyME5vaXNlJTIwQ2FuY2VsbGluZyUyMEVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D' },
  { id: 38, title: 'Smart LED Light Bulb', price: 14.99, category: 'Smart Lighting', description: 'App-controlled color-changing bulb with voice assistant support.', image: 'https://images.unsplash.com/photo-1532007271951-c487760934ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U21hcnQlMjBMRUQlMjBMaWdodCUyMEJ1bGJ8ZW58MHx8MHx8fDA%3D' },
  { id: 39, title: 'Anti-Theft Laptop Backpack', price: 46.00, category: 'Laptop Sleeves/Bags', description: 'Hidden zippers and USB charging port for daily commutes.', image: 'https://images.unsplash.com/photo-1668114844900-537ab91478b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QW50aS1UaGVmdCUyMExhcHRvcCUyMEJhY2twYWNrfGVufDB8fDB8fHww' },
  { id: 40, title: 'Tempered Glass Screen Protector', price: 9.99, category: 'Screen Protectors', description: '9H hardness glass with oleophobic anti-fingerprint coating.', image: 'https://images.unsplash.com/photo-1694878981905-b742a32f8121?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VGVtcGVyZWQlMjBHbGFzcyUyMFNjcmVlbiUyMFByb3RlY3RvcnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 41, title: 'Cat6 Ethernet Cable 5m', price: 10.50, category: 'Cables', description: 'Snagless connectors with gigabit-speed shielded cable.', image: 'https://images.unsplash.com/photo-1604005366359-2f8f2a044336?w=500&auto=format&fit=crop&q=60' },
  { id: 42, title: 'Mini Portable Projector', price: 84.00, category: 'Projectors', description: 'Compact 1080p-supported projector for movies on the go.', image: 'https://images.unsplash.com/photo-1637656375538-9dfe600ccfd2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWluaSUyMFBvcnRhYmxlJTIwUHJvamVjdG9yfGVufDB8fDB8fHww' }
];

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/seed', async (req, res) => {
    try {
        await Product.bulkCreate(defaultTechProducts);
        res.status(201).json({ message: "All products seeded successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, price, description, image, category } = req.body;
        const newProduct = await Product.create({ title, price, description, image, category });
        res.status(201).json({ message: "Product added successfully!", newProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;