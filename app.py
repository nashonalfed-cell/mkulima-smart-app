import streamlit as st
import json

# Muundo wa App
st.set_page_config(page_title="Nashon Crop App", layout="wide")

# Kazi ya kusoma JSON database
@st.cache_data
def load_db():
    try:
        # Hakikisha jina hili linafanana na faili lako la .json
        with open('crops.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return "file_not_found"
    except json.JSONDecodeError:
        return "json_error"

data = load_db()

st.title("🌱 Smart Crop Advisor")

if data == "file_not_found":
    st.error("Hitilafu: Faili la 'crops.json' halijaonekana GitHub.")
elif data == "json_error":
    st.error("Hitilafu: Kuna kosa la uandishi ndani ya 'crops.json' (angalia koma au mabano).")
else:
    # Sehemu ya Search
    st.write("Karibu! Tafuta zao upate ushauri wa kitaalamu.")
    search_query = st.text_input("Andika jina la zao (mfano: peanuts, avocado, mango):").lower().strip()

    if search_query:
        if search_query in data:
            crop = data[search_query]
            col1, col2 = st.columns([1, 2])
            
            with col1:
                st.image(crop['image'], use_container_width=True)
            with col2:
                st.markdown(f"### {search_query.capitalize()}")
                st.markdown(crop['description'], unsafe_allow_html=True)
        else:
            st.warning("Samahani, zao hilo bado halipo kwenye database yetu.")
    else:
        st.info("Andika kitu kwenye sanduku la utafutaji hapo juu.")
