import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createEvent = async (req, res) => {

    console.log(req.body);

    const { name, description, date, location, type, capacity, languages, image, categoryId } = req.body;

    
    try {
        const newEvent = await prisma.events.create({
            data: {
                name,
                description,
                date,
                location,
                type,
                capacity,
                languages,
                image,
                categoryId,
            }
        });
        res.json({ message: 'Event created successfully', newEvent });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllEvents = async (req, res) => {
    try {
        const events = await prisma.events.findMany();
        res.json(events);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await prisma.events.findUnique({
            where: {
                id
            }
        });
        res.json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, description, date, location, type, capacity, languages, image, category } = req.body;
    try {

        const event = await prisma.events.findUnique({
            where: {
                id
            }
        });

        if (!event) {
            return res.status(400).json({ error: 'Event not found' });
        } else {
            await prisma.events.update({
                where: {
                    id
                },
                data: {
                    name,
                    description,
                    date,
                    location,
                    type,
                    capacity,
                    languages,
                    image,
                    category,
    
                }
            });
            res.json({ message: 'Event updated successfully', event });
        }

        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEvent = await prisma.events.findUnique({
            where: {
                id
            }
        });

        if (!deletedEvent) {
            return res.status(400).json({ error: 'Event not found' });
        } else {
            await prisma.events.delete({
                where: {
                    id
                }
            });
        }

        res.json({ message: 'Event deleted successfully', deletedEvent });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}
